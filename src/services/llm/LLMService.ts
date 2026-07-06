import { openAIProvider } from "./OpenAIProvider";

class LLMService {
  async ask(prompt: string) {
    return openAIProvider.generate(prompt);
  }

  async testConnection() {
    return this.ask("Test Aria OS LLM connection.");
  }
}

export const llmService = new LLMService();