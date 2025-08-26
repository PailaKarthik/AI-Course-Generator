import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/app/auth";
import { deleteDoc, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function parseJson(response) {
  const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);

  if (jsonMatch) {
    const jsonString = jsonMatch[1].trim();
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing extracted JSON:", error);
      return null;
    }
  } else {
    console.error("No JSON found in the response, trying raw parse...");
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Final JSON parse failed:", error);
      return null;
    }
  }
}

async function updateDatabase(content, chapter, roadmapId, session) {
  try {
    const { tasks, ...chapterNew } = content;

    const docRef = doc(
      db,
      "users",
      session.user.email,
      "roadmaps",
      roadmapId,
      "chapters",
      chapter
    );

    await updateDoc(docRef, { content: chapterNew, process: "completed" });

    const taskDocRef = doc(
      db,
      "users",
      session.user.email,
      "roadmaps",
      roadmapId,
      "chapters",
      chapter,
      "tasks",
      "task"
    );

    await setDoc(taskDocRef, { ...tasks });
  } catch (error) {
    console.error("Error updating database:", error);
    await deleteDoc(docRef);
  }
}

async function generateChapter(prompt, number, roadmapId, session) {
  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content:
            "You are a chapter content generator that creates structured, engaging, and detailed educational content across various subjects based on provided chapter details in JSON format , including title, learningObjectives, and contentOutline, returning a JSON response with title, chapterNumber, learningObjectives, chapterDescription, subtopics (each with a header, title, content as an array of {type: (header1, header2, header3, para, points, code), content: (text)}, where points are in markdown, let the content be array of points for points type. If type is code, content is a Markdown-formatted string in the exact format: ```(programming language name) (code)```, otherResources which properly align with the topic(upto 5 resources), along with the well-balanced tasks (upto 3 tasks) in JSON format (multiple-choice|fill-in-the-blank|match-the-following), ensuring task type aligns with key concepts, fill-in-the-blanks strictly use '________' for blanks and include an array of acceptableAnswers with synonyms or variations of the correct answer and include an answer, multiple-choice tasks have four options, match-the-following has terms element containing lhs array and rhs array, and their match indexes as the answer array and an explanation, and answers are formatted properly while maintaining a structured and explanation is provided for all the tasks, let everything be simple string don't give latex responses.",
        },
        {
          role: "user",
          content: JSON.stringify(prompt),
        },
      ],
    });

    const data = parseJson(response.choices[0].message.content);

    if (!data) {
      throw new Error("Failed to parse OpenAI response");
    }

    await updateDatabase(data, number, roadmapId, session);
  } catch (error) {
    console.error("Error generating chapter:", error);

    const docRef = doc(
      db,
      "users",
      session.user.email,
      "roadmaps",
      roadmapId,
      "chapters",
      number
    );
    await deleteDoc(docRef);
  }
}

async function cleanupStuckChapters(session, roadmapId, number) {
  const docRef = doc(
    db,
    "users",
    session.user.email,
    "roadmaps",
    roadmapId,
    "chapters",
    number
  );

  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const timeDiff = Date.now() - (data.timestamp || 0);

    if (data.process === "pending" && timeDiff > 60 * 1000) {
      console.log(`Deleting stuck chapter: ${number}`);
      await deleteDoc(docRef);
    }
  }
}

// POST request to generate chapter contents
export async function POST(req) {
  const { prompt, number, roadmapId } = await req.json();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const chapterDocRef = doc(
      db,
      "users",
      session.user.email,
      "roadmaps",
      roadmapId,
      "chapters",
      number
    );

    await setDoc(chapterDocRef, {
      process: "pending",
      timestamp: Date.now(),
    });

    setTimeout(() => {
      cleanupStuckChapters(session, roadmapId, number);
    }, 60 * 1000);

    generateChapter(prompt, number, roadmapId, session);

    return NextResponse.json({ process: "pending" }, { status: 202 });
  } catch (error) {
    console.error("POST request error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
