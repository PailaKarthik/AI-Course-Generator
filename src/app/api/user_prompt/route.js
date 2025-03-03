import { NextResponse } from "next/server";
import { openai } from "@/lib/utils";

// Post request
export async function POST(req, res) {
    let user_prompt = await req.json();
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: user_prompt.prompt,
            },
        ],
    });
    return NextResponse.json({ text: response.choices[0].message});
}
