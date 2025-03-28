import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/app/auth";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

async function updateDatabase(details, id, user) {
    const docref = doc(db, "users", user.email, "roadmaps", id);
    await setDoc(docref, details);
}

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function parseJson(response) {
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);

    if (jsonMatch) {
        const jsonString = jsonMatch[1];
        try {
            const jsonData = JSON.parse(jsonString);
            return jsonData;
        } catch (error) {
            console.error("Error parsing JSON:", error);
        }
    } else {
        console.error("No JSON found in the response");
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
                        "Act as a structured roadmap generator. Create a chapter-wise learning path for [CONCEPT] with these requirements: Format: Strictly return valid JSON (no markdown) with camelCase keys, never include backticks, '```json'. The json must contain the CourseTitle CourseDescription and Each chapter must contain: chapterNumber (integer), chapterTitle (concise), chapterDescription (1 sentence), learningObjectives, contentOutline . Style: Learning objectives start with action verbs (Analyze, Implement, Compare). Avoid vague terms - focus on measurable outcomes. Prioritize logical progression from foundational to advanced topics.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });
        const parsedResponse = parseJson(response.choices[0].message.content);
        if (parsedResponse.error) {
            await updateDatabase(
                {
                    message:
                        "The provided concept is unsuitable for forming a course.",
                    process: "unsuitable",
                },
                id,
                session.user
            );
            return;
        }
        const docRef = doc(db, "users", session.user.email);
        const difficulty =
            user_prompt.difficulty === "in-depth"
                ? "inDepth"
                : user_prompt.difficulty;
        await updateDoc(docRef, {
            [`roadmapLevel.${difficulty}`]: increment(1),
        });
        await updateDatabase(
            {
                ...parsedResponse,
                createdAt: Date.now(),
                difficulty,
            },
            id,
            session.user
        );
        const roadmapRef = doc(db, "users", session.user.email, "roadmaps", id);
        await updateDoc(roadmapRef, {
            process: "completed",
        });
    } catch (error) {
        await updateDatabase(
            {
                message: "There was an error while generating your roadmap. ",
                process: "error",
            },
            id,
            session.user
        );
    }
}

// Post request to generate the roadmap
export async function POST(req) {
    let user_prompt = await req.json();
    const session = await auth();
    if (!session) {
        return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }
    try {
        const roadmapId = nanoid(20);
        await updateDatabase({ process: "pending" }, roadmapId, session.user);
        generateRoadmap(user_prompt.prompt, roadmapId, session, user_prompt);

        return NextResponse.json(
            { process: "pending", id: roadmapId },
            { status: 202 }
        );
    } catch (error) {
        console.log({ error });

        return NextResponse.json({ message: error }, { status: 500 });
    }
}
