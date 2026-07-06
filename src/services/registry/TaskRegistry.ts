import { TaskType } from "@/types/task";
import { Agent } from "@/types/agent";

import { instagramAgent } from "../agents/InstagramAgent";
import { analyticsAgent } from "../agents/AnalyticsAgent";

class TaskRegistry {
  private registry: Record<TaskType, Agent> = {
    "generate-story": instagramAgent,
    "create-caption": instagramAgent,
    "create-image-prompt": instagramAgent,
    "analyze-performance": analyticsAgent,
  };

  resolve(task: TaskType): Agent | null {
    return this.registry[task] ?? null;
  }
}

export const taskRegistry = new TaskRegistry();