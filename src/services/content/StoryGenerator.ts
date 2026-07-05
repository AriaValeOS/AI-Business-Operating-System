export class StoryGenerator {
  generate() {
    return {
      title: "Morning Coffee in Stockholm",
      idea: "A calm morning story with coffee, soft morning light and Scandinavian lifestyle.",
      format: "Instagram Story",
      status: "Ready",
    };
  }
}

export const storyGenerator = new StoryGenerator();