import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getContent } from "@/lib/content";

const MODEL = "gemini-3.1-flash-lite-preview";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not configured." },
      { status: 500 },
    );
  }

  let body: { question?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const question = typeof body?.question === "string" ? body.question.trim() : "";
  if (!question) {
    return NextResponse.json(
      { error: "Missing or empty 'question' in body." },
      { status: 400 },
    );
  }

  try {
    const content = await getContent();
    const context = JSON.stringify(content, null, 2);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL });

    const prompt = `You are a helpful assistant for a personal portfolio. Answer the user's question using ONLY the following JSON data about the portfolio owner (experience, education, skills, projects, etc.). Be concise and factual. If the answer is not in the data, say so.

Portfolio data (JSON):
${context}

User question: ${question}

Answer:`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text?.() ?? "";

    return NextResponse.json({ answer: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Failed to get a response from the assistant." },
      { status: 500 },
    );
  }
}
