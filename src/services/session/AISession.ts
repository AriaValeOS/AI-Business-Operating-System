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

    // 🧠 Brain pieņem lēmumu
    const decision = brain.decide();

    // 🤖 AgentManager izpilda Brain lēmumu
    const result = agentManager.run(decision);

    contentStore.clear();

    result.queueItems.forEach((item) => {
      contentStore.add(item);
    });

    brain.setStatus("complete");

    return {
      message: result.message,
      queueCount: contentStore.getQueueCount(),
      logs: [
        "AI Session started",
        ...result.logs,
        "Content saved to queue",
        "Session completed",
      ],
    };
  }
}

export const aiSession = new AISession();