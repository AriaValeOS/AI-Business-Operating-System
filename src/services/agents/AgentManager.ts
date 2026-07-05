import { BrainDecision } from "@/types/brainDecision";
import { instagramAgent } from "./InstagramAgent";
import { analyticsAgent } from "./AnalyticsAgent";

export type AgentResult = {
  agent: string;
  message: string;
  queueItems: string[];
  logs: string[];
};

export class AgentManager {
  run(decision: BrainDecision): AgentResult {
    if (decision.agent === "InstagramAgent") {
      return this.runInstagramAgent(decision.reason);
    }

    if (decision.agent === "AnalyticsAgent") {
      return this.runAnalyticsAgent(decision.reason);
    }

    return {
      agent: "Unknown",
      message: "No matching agent found.",
      queueItems: [],
      logs: ["No matching agent found."],
    };
  }

  private runInstagramAgent(reason: string): AgentResult {
    const result = instagramAgent.run();

    return {
      agent: "InstagramAgent",
      message: "Instagram Agent completed.",
      queueItems: [
        result.story.title,
        result.caption,
        result.prompt,
        result.hashtags.join(" "),
      ],
      logs: [
        `Brain decision: ${reason}`,
        "Loading Instagram Agent",
        `Story created: ${result.story.title}`,
        `Story idea: ${result.story.idea}`,
        `Caption created: ${result.caption}`,
        "Image prompt created",
        "Hashtags generated",
      ],
    };
  }

  private runAnalyticsAgent(reason: string): AgentResult {
    const result = analyticsAgent.run();

    return {
      agent: "AnalyticsAgent",
      message: "Analytics Agent completed.",
      queueItems: [],
      logs: [
        `Brain decision: ${reason}`,
        ...result.logs,
        `Followers: ${result.report.followers}`,
        `Engagement: ${result.report.engagement}`,
        `Reach: ${result.report.reach}`,
      ],
    };
  }
}

export const agentManager = new AgentManager();