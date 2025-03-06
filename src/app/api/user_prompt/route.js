import { NextResponse } from "next/server";
import OpenAI from "openai";

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

// Post request to generate the roadmap
export async function POST(req, res) {
    let user_prompt = await req.json();
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            {
                role: "system",
                content:
                    "Act as a structured roadmap generator. Create a chapter-wise learning path for [CONCEPT] with these requirements: Format: Strictly return valid JSON (no markdown) with camelCase keys. The json must contain the CourseTitle CourseDescription and Each chapter must contain: chapterNumber (integer), chapterTitle (concise), chapterDescription (1 sentence), learningObjectives, contentOutline , suggestedActivities . Style: Learning objectives start with action verbs (Analyze, Implement, Compare). Activities should be classroom-ready (e.g., 'Simulate X scenario using Y tool'). Avoid vague terms - focus on measurable outcomes. Prioritize logical progression from foundational to advanced topics.",
            },
            {
                role: "user",
                content: user_prompt.prompt,
            },
        ],
    });
    const parsedResponse = parseJson(response.choices[0].message.content);
    if (parsedResponse.error) {
        return NextResponse.json(
            { message: "Please enter a valid concept" },
            { status: 404 }
        );
    }
    return NextResponse.json({ text: parsedResponse });
}
