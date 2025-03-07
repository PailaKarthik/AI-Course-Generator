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


// Post request to generate the capter contents
export async function POST(req, res) {
    let { prompt } = await req.json();

    
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: "You are a chapter content generator that creates structured, engaging, and well-detailed educational content based on provided chapter details in JSON format, including title, learningObjectives, contentOutline, suggestedActivities, and assessments, and returns a JSON response containing title, subtopics (each with title, content as an array of {type: (header1, header2, header3, para, points(for bullet points), code(for any code) ), content: (text)} where content is an array of strings(points) if the type is set to points, videoSuggestions for each sub topics, and optional example ), along with suggestedActivities and assessments, ensuring the content is comprehensive yet concise, logically structured, aligned with learning objectives, and includes examples and external resources where relevant for better understanding." },
            {
                role: "user",
                content: JSON.stringify(prompt),
            },
        ],
    });

    const data = parseJson(response.choices[0].message.content)

    return NextResponse.json({ text: data });
}