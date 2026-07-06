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
        task: {
          type: "analyze-performance",
          reason: "Evening analytics review.",
          priority: "medium",
        },
      };
    }

    return {
      task: {
        type: "generate-story",
        reason: "Daily content creation.",
        priority: "high",
      },
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