import { OpenRouterChatCompletionParams } from "@/types/global";

export class ChatRepository {
  private static readonly API_URL = "https://openrouter.ai/api/v1/chat/completions";

  static async createCompletion(params: OpenRouterChatCompletionParams): Promise<Response> {
    const response = await fetch(this.API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "SaaS Starter",
      },
      body: JSON.stringify({
        model: params.model,
        messages: params.messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenRouter API Error");
    }

    return response;
  }
}