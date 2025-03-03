import { NextResponse } from "next/server";
import { openai } from "@/lib/utils";

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
            { role: "system", content: "You are a roadmap-generating assistant that creates structured, chapter-wise learning roadmaps for any concept. Ensure that each chapter is of moderate length—neither too short nor too long. Provide the response strictly in JSON format so that it can be easily parsed. The JSON should include a clear breakdown of chapters, their titles, learning objectives, content outlines, suggested activities, and assessments. The output will be used to generate detailed content for each chapter using an LLM." },
            {
                role: "user",
                content: user_prompt.prompt,
            },
        ],
    });
    const parsedResponse = parseJson(response.choices[0].message.content);

    return NextResponse.json({ text: parsedResponse });
}
