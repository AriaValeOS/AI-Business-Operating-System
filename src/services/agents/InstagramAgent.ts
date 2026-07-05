import { Agent, AgentResult } from "@/types/agent";
import { storyGenerator } from "@/services/content/StoryGenerator";
import { captionGenerator } from "@/services/content/CaptionGenerator";
import { promptGenerator } from "@/services/content/PromptGenerator";

export class InstagramAgent implements Agent {
  name = "InstagramAgent";
  task = "instagram-content";

  run(): AgentResult {
    const story = storyGenerator.generate();
    const caption = captionGenerator.generate();
    const prompt = promptGenerator.generate();

    const hashtags = [
      "#aria",
      "#ai",
      "#instagram",
      "#content",
      "#lifestyle",
    ];

    return {
      message: "Instagram content created.",
      queueItems: [
        story.title,
        caption,
        prompt,
        hashtags.join(" "),
      ],
      logs: [
        "Loading Instagram Agent",
        `Story created: ${story.title}`,
        `Story idea: ${story.idea}`,
        `Caption created: ${caption}`,
        "Image prompt created",
        "Hashtags generated",
      ],
    };
  }
}

export const instagramAgent = new InstagramAgent();