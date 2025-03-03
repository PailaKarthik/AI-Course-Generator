import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
// Post request
export async function POST(req, res) {

  let prompt= await req.json()
  const result = await model.generateContent(prompt.value);
  return NextResponse.json({ text: result.response.text() });
}       
