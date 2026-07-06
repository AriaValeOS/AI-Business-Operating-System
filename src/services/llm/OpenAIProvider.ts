import { env } from "@/config/env";
import { LLMProvider } from "./LLMProvider";

export class OpenAIProvider implements LLMProvider {
  name = "OpenAI";

  async generate(prompt: string): Promise<string> {
    if (!env.openAIKey) {
      return "OpenAI API key missing.";
    }

    console.log("Using OpenAI...");
    console.log(prompt);

    return "OpenAI placeholder response.";
  }
}

export const openAIProvider = new OpenAIProvider();