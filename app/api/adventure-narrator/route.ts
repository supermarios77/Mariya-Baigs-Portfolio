import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "AI Narrator unavailable. API key not configured.",
        },
        { status: 500 }
      );
    }

    const { command, locationName, locationDescription, inventory, xp } = await request.json();

    if (!command) {
      return NextResponse.json(
        { error: "Command is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are the narrator of an immersive text-based adventure game set in Mariya's digital portfolio world. 

CONTEXT:
Current Location: ${locationName}
Location Description: ${locationDescription}
Player XP: ${xp}
Player Inventory: ${inventory && inventory.length > 0 ? inventory.join(', ') : 'Empty'}

GAME WORLD RULES:
- This is Mariya's portfolio presented as an explorable sci-fi lab/space
- Locations include: AI Lab, Project Shelves, System Cores, Communication Hub
- The player is exploring Mariya's work (AI projects, iOS apps, TensorFlow expertise)
- Style: Futuristic, professional, but playful and mysterious

NARRATOR PERSONALITY:
- Mysterious and atmospheric
- Sometimes playful or whimsical
- Observant and descriptive
- Uses sensory details and atmosphere
- Brief, evocative responses (2-3 sentences max)

COMMAND CONTEXT:
The player typed: "${command}"
This command is not in the standard game command list (look, go, take, inspect, etc.)

YOUR TASK:
Generate a creative, immersive response that:
1. Acknowledges their attempt with atmospheric description
2. Gives a subtle hint about what they CAN do
3. Maintains the mysterious, sci-fi lab atmosphere
4. Keep it SHORT (2-3 sentences)
5. Make it poetic/atmospheric rather than just "unknown command"

Example good responses:
- "You whisper "${command}" into the lab's silence. The holographic displays shimmer but reveal nothing new. Perhaps try 'look' to survey your surroundings?"
- "The command hangs in the air unheard. The ambient hum of machinery continues, indifferent to your "${command}". Maybe 'help' would orient you?"
- "You attempt "${command}", but the environment remains unchanged. Consider typing 'look' to understand where you are."

Generate a creative, atmospheric response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Adventure Narrator API error:", error);

    let errorMessage = "The lab's AI systems are offline. Try standard commands like 'look', 'go', 'help'.";

    if (error instanceof Error) {
      if (error.message.includes("404")) {
        errorMessage = "Model unavailable. Use commands like 'look' or 'help'.";
      } else if (error.message.includes("quota")) {
        errorMessage = "System resources depleted. Try later or use 'help' for commands.";
      }
    }

    return NextResponse.json({ response: errorMessage });
  }
}

