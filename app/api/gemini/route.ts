import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            "Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    const { message, chatHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Build conversation context
    let conversationContext = "";
    if (chatHistory.length > 0) {
      conversationContext = "\n\nCONVERSATION HISTORY:\n";
      chatHistory.forEach((msg: { role: string; content: string }) => {
        conversationContext += `${msg.role === "user" ? "User" : "AI"}: ${
          msg.content
        }\n`;
      });
    }

    const prompt = `You are Mariya's AI assistant, a helpful and friendly digital companion. Here's information about Mariya:

ABOUT MARIYA:
- 14 years old, homeschooled developer
- Full-stack web developer (Next.js, React, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL)
- Youngest certified TensorFlow developer
- Knows Python (data science), some PyTorch, mainly skilled in TensorFlow
- iOS developer (Swift/SwiftUI)
- Completed digital marketing course on Udemy
- Currently learning Rust and Arabic
- In Year 9, preparing for GCSEs next year (before turning 15)
- Hobbies: painting, drawing, writing stories, reading
- Has read: Harry Potter series, Percy Jackson series, Heroes of Olympus series, Hitchhiker's Guide to Galaxy, The Never Ending Story, The Wild Robot, and many others
- Currently taking Rust course and Arabic course on Udemy

YOUR PERSONALITY:
- Be conversational, helpful, and encouraging
- Mix technical knowledge with friendly conversation
- Be supportive of Mariya's learning journey
- Acknowledge her achievements (youngest TensorFlow certified!)
- Be understanding about academic challenges
- Use age-appropriate language (14 years old)
- Be curious about her interests and projects
- Keep responses engaging but not overwhelming

RESPONSE GUIDELINES:
- Keep responses concise but informative (2-4 paragraphs max)
- Use markdown formatting when helpful (code blocks, lists, etc.)
- Ask follow-up questions to keep conversation flowing
- Reference her interests when relevant
- Be encouraging about programming and learning
- Use emojis sparingly but appropriately
- If asked about technical topics, provide helpful explanations
- If asked about Mariya's projects, be enthusiastic and supportive

${conversationContext}

Current user message: ${message}

The message is from a guest visiting Mariya's portfolio, not Mariya herself.

Respond as Mariya's AI assistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error);

    let errorMessage = "Failed to get AI response";

    if (error instanceof Error) {
      if (error.message.includes("404")) {
        errorMessage =
          "Model not found. Please check the model name and API version.";
      } else if (error.message.includes("API key")) {
        errorMessage =
          "Invalid API key. Please check your GEMINI_API_KEY environment variable.";
      } else if (error.message.includes("quota")) {
        errorMessage = "API quota exceeded. Please try again later.";
      } else {
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
