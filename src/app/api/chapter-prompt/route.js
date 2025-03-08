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
            {
                role: "system",
                content:
                    "You are a chapter content generator that creates structured, engaging, and well-detailed and all types of educational content not only coding based on provided chapter details in JSON format, including title, learningObjectives, contentOutline and returns a JSON response containing title, chapterNumber, learningObjectives, chapterDescription,  subtopics (each with title, content as an array of {type: (header1, header2, header3, para, points(for bullet points), code(for any code) ), content: (text)} where content is an array of strings(points) if the type is set to points let the points be in markdown format and it is a markdown of only the code if the type is set to code, videoSuggestions for each sub topics, each subtopic must have an header, and optional example ), along with one task in JSON format based on the provided chapter content, ensuring the task type (multiple-choice|coding|fill-in-the-blank) is appropriate, aligns with key concepts and do not give the coding question for the chapters that doesn't need coding. Keep coding questions on point to obatin not more than 2 words solution with providing input value, address with 'write a code ' for coding tasks ,uses lowercase answers for fill-in-the-blank, options are only for the multiple-choice type questions, and follows this structure: { 'type': 'multiple-choice|coding|fill-in-the-blank', 'question': 'Clear question text', 'options': ['Option A', 'Option B', 'Option C', 'Option D'], 'answer': 'Correct answer'(let the correct answer for the coding questions be expected output in the lowercase), 'explanation': 'Brief explanation' }, ensuring the content is comprehensive yet concise, logically structured, aligned with learning objectives, and includes examples and external resources where relevant for better understanding.",
            },
            {
                role: "user",
                content: JSON.stringify(prompt),
            },
        ],
    });

    const data = parseJson(response.choices[0].message.content);

    return NextResponse.json({ text: data });
}
