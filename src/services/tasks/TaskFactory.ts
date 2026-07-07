import { Task, TaskPriority, TaskType } from "@/types/task";

type CreateTaskInput = {
  type: TaskType;
  reason: string;
  priority: TaskPriority;
  metadata?: Record<string, unknown>;
};

class TaskFactory {
  create(input: CreateTaskInput): Task {
    const now = Date.now();

    return {
      id: crypto.randomUUID(),
      type: input.type,
      reason: input.reason,
      priority: input.priority,
      status: "pending",
      createdAt: now,
      updatedAt: now,
      retries: 0,
      metadata: input.metadata,
    };
  }
}

export const taskFactory = new TaskFactory();