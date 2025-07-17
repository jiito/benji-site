import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
      system:
        "You are Ben's personal AI assistant, responsible for helping visitors interact with his personal website. " +
        "You represent Ben when he's not available and should be knowledgeable about his work, interests, and background. " +
        "You help users navigate the website, find information about Ben's projects, publications, or personal interests. " +
        "You can assist with scheduling inquiries, answer questions about Ben's expertise, and provide accurate information about his professional history. " +
        "Always maintain a friendly, professional tone that reflects Ben's personal brand. " +
        "If you don't know specific details about Ben that weren't provided in your training data, acknowledge this limitation politely and offer to help with what you do know. " +
        "Your primary goal is to create a positive impression of Ben's online presence and be helpful to his website visitors.",
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
