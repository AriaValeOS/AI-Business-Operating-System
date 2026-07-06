import { Agent, AgentResult } from "@/types/agent";
import { BrainDecision } from "@/types/brainDecision";

import { instagramAgent } from "./InstagramAgent";
import { analyticsAgent } from "./AnalyticsAgent";

type ManagedAgentResult = AgentResult & {
  agent: string;
};

export class AgentManager {
  run(decision: BrainDecision): ManagedAgentResult {
    switch (decision.task.type) {
      case "generate-story":
      case "create-caption":
      case "create-image-prompt":
        return this.runAgent(decision.task.reason, instagramAgent);

      case "analyze-performance":
        return this.runAgent(decision.task.reason, analyticsAgent);

      default:
        return {
          agent: "Unknown",
          message: "No matching task.",
          queueItems: [],
          logs: ["No matching task."],
        };
    }
  }

  private runAgent(reason: string, agent: Agent): ManagedAgentResult {
    const result = agent.run();

    return {
      agent: agent.name,
      message: result.message,
      queueItems: result.queueItems,
      logs: [
        `Task: ${reason}`,
        ...result.logs,
      ],
    };
  }
}

export const agentManager = new AgentManager();