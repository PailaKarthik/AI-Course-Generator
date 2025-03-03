import { NextResponse } from "next/server";
import { openai } from "@/lib/utils";

// Post request to generate the capter contents
export async function POST(req, res) {
    let { prompt } = await req.json();
    
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: "You are a chapter content generator. You will receive chapter details in JSON format, including the title, learning objectives, content outline, suggested activities, and assessments. Based on this information, generate well-structured and detailed content for the chapter. Ensure the content is informative, engaging, and aligned with the provided objectives. Maintain a balanced depth—comprehensive but concise. The response should be in a structured format that aligns with the given details." },
            {
                role: "user",
                content: JSON.stringify(prompt),
            },
        ],
    });

    return NextResponse.json({ text: response.choices[0].message });
}
