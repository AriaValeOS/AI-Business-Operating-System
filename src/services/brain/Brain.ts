import { BrainStatus } from "@/types/brainStatus";
import { BrainDecision } from "@/types/brainDecision";

class Brain {
  private status: BrainStatus = "idle";

  think() {
    return {
      status: this.status,
      message:
        this.status === "thinking"
          ? "Thinking..."
          : this.status === "complete"
          ? "Task completed."
          : "Ready for next task.",
      provider: "Not connected",
      timestamp: Date.now(),
    };
  }

  decide(): BrainDecision {
  const hour = new Date().getHours();

  if (hour >= 18) {
    return {
      task: "analytics-report",
      reason: "Evening analytics review.",
      agent: "AnalyticsAgent",
    };
  }

  return {
    task: "instagram-content",
    reason: "Daily Instagram content scheduled.",
    agent: "InstagramAgent",
  };
}

  setStatus(status: BrainStatus) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }
}

export const brain = new Brain();