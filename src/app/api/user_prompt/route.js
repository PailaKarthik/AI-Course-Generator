import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/app/auth";
import { db } from "@/lib/firebase";
import {
  doc,
  updateDoc,
  increment,
  setDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { nanoid } from "nanoid";

async function updateDatabase(details, id, user, retries = 3) {
  const docRef = doc(db, "users", user.email, "roadmaps", id);
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await setDoc(docRef, details, { merge: true });
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) throw new Error("Database update failed");
      await new Promise((res) => setTimeout(res, 1000 * attempt));
    }
  }
}

export const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function parseJson(response) {
  try {
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    return JSON.parse(response);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return { error: true };
  }
}

async function generateRoadmap(prompt, id, session, user_prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content:
            "Act as a structured roadmap generator. Create a chapter-wise learning path for [CONCEPT] with these requirements: Format: Strictly return valid JSON (no markdown) with camelCase keys, never include backticks, '```json'. The json must contain the CourseTitle, CourseDescription, and each chapter must contain: chapterNumber (integer), chapterTitle (concise), chapterDescription (1 sentence), learningObjectives, contentOutline. Style: Learning objectives start with action verbs (Analyze, Implement, Compare). Avoid vague terms - focus on measurable outcomes. Prioritize logical progression from foundational to advanced topics.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const parsedResponse = parseJson(response.choices[0]?.message?.content);
    if (parsedResponse.error) {
      await updateDatabase(
        {
          message: "The provided concept is unsuitable for forming a course.",
          process: "unsuitable",
        },
        id,
        session.user
      );
      return;
    }

    const difficulty =
      user_prompt.difficulty === "in-depth"
        ? "inDepth"
        : user_prompt.difficulty;
    await updateDoc(doc(db, "users", session.user.email), {
      [`roadmapLevel.${difficulty}`]: increment(1),
    });

    await updateDatabase(
      {
        ...parsedResponse,
        createdAt: Date.now(),
        difficulty,
        process: "completed",
      },
      id,
      session.user
    );
  } catch (error) {
    console.error("Error generating roadmap:", error);
    await updateDatabase(
      {
        message: "There was an error while generating your roadmap.",
        process: "error",
      },
      id,
      session.user
    );
  }
}

async function checkEligible(session) {
  try {
    const q = query(
      collection(db, "users", session.user.email, "roadmaps"),
      where("process", "==", "completed")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size <= 6;
  } catch (error) {
    console.error("Error checking eligibility:", error);
    return false;
  }
}

// POST request to generate the roadmap
export async function POST(req) {
  const user_prompt = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  if (user_prompt?.prompt.length > 800) {
    console.log(user_prompt?.prompt.length);

    return NextResponse.json(
      {
        message: "The given prompt is beyond maximum character length.",
      },
      { status: 400 }
    );
  }

  try {
    const roadmapId = nanoid(20);
    await updateDatabase({ process: "pending" }, roadmapId, session.user);

    setTimeout(
      () =>
        generateRoadmap(user_prompt.prompt, roadmapId, session, user_prompt),
      0
    );

    const isEligible = await checkEligible(session);
    if (!isEligible) {
      return NextResponse.json(
        { message: "Max limit reached" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { process: "pending", id: roadmapId },
      { status: 202 }
    );
  } catch (error) {
    console.error("Error in roadmap generation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
