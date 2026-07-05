import { BrainStatus } from "@/types/brainStatus";

export class Brain {
  private status: BrainStatus = "idle";

  getStatus() {
    return this.status;
  }

  setStatus(status: BrainStatus) {
    this.status = status;
  }

  think() {
    return {
      status: this.status,
      message: this.getMessage(),
      provider: "Not connected",
    };
  }

  private getMessage() {
    switch (this.status) {
      case "idle":
        return "Waiting for command.";

      case "thinking":
        return "Thinking...";

      case "story":
        return "Generating Story...";

      case "caption":
        return "Creating Caption...";

      case "image":
        return "Creating Image Prompt...";

      case "complete":
        return "Task completed.";

      case "error":
        return "Something went wrong.";

      default:
        return "Unknown.";
    }
  }
}

export const brain = new Brain();