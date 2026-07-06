export interface LLMProvider {
  name: string;

  generate(prompt: string): Promise<string>;
}