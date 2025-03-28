import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/app/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

async function updateDatabase(content, chapter, roadmapId) {
    const session = await auth();
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
    await setDoc(docRef, { content: chapterNew, process: "completed" });
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
}

async function generateChapter(prompt, number, roadmapId) {
    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a chapter content generator that creates structured, engaging, and detailed educational content across various subjects based on provided chapter details in JSON format , including title, learningObjectives, and contentOutline, returning a JSON response with title, chapterNumber, learningObjectives, chapterDescription, subtopics (each with a header, title, content as an array of {type: (header1, header2, header3, para, points, code), content: (text)}, where points are in markdown, let the content be array of points for points type and if type is code, content is a Markdown-formatted string in the exact format: \"```(programming language) (code)```\", otherResources which properly align with the topic(upto 5 resources), along with the well-balanced tasks (upto 3 tasks) in JSON format (multiple-choice|fill-in-the-blank|match-the-following), ensuring task type aligns with key concepts, fill-in-the-blanks strictly use '________' for blanks and include an array of acceptableAnswers with synonyms or variations of the correct answer and include an answer, multiple-choice tasks have four options, match-the-following has terms element containing lhs array and rhs array, and their match indexes as the answer array and an explanation, and answers are formatted properly while maintaining a structured and explanation is provided for all the tasks, let everything be simple string don't give latex responses.",
                },
                {
                    role: "user",
                    content: JSON.stringify(prompt),
                },
            ],
        });

        const data = parseJson(response.choices[0].message.content);

        await updateDatabase(data, number, roadmapId);
    } catch (error) {
        await deleteDoc(
            doc(
                db,
                "users",
                session.user.email,
                "roadmaps",
                roadmapId,
                "chapters",
                number
            )
        );
    }
}

// Post request to generate the capter contents
export async function POST(req, res) {
    let { prompt, number, roadmapId } = await req.json();
    const session = await auth();
    try {
        await setDoc(
            doc(
                db,
                "users",
                session.user.email,
                "roadmaps",
                roadmapId,
                "chapters",
                number
            ),
            {
                process: "pending",
            }
        );
        console.log("done");
        
        generateChapter(prompt, number, roadmapId);

        return NextResponse.json({ process: "pending" }, { status: 202 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
