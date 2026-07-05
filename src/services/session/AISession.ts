import { brain } from "@/services/brain/Brain";
import { contentStore } from "@/services/store/ContentStore";
import { agentManager } from "@/services/agents/AgentManager";

export type AISessionResult = {
  message: string;
  queueCount: number;
  logs: string[];
};

export class AISession {
  run(): AISessionResult {
    brain.setStatus("thinking");

    const result = agentManager.runInstagramAgent();

    contentStore.clear();
    contentStore.add(result.story.title);
    contentStore.add(result.post.title);
    contentStore.add(result.caption);
    contentStore.add(result.hashtags.join(" "));

    brain.setStatus("complete");

    return {
      message: "Instagram Agent completed.",
      queueCount: contentStore.getQueueCount(),
      logs: [
        "AI Session started",
        "Loading Instagram Agent",
        `Story created: ${result.story.title}`,
        `Post created: ${result.post.title}`,
        "Caption created",
        "Hashtags generated",
        "Content saved to queue",
        "Session completed",
      ],
    };
  }
}

export const aiSession = new AISession();