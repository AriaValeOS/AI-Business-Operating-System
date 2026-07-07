export type TaskType =
  | "generate-story"
  | "create-caption"
  | "create-image-prompt"
  | "analyze-performance";

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus =
  | "pending"
  | "queued"
  | "running"
  | "completed"
  | "failed";

export type Task = {
  id: string;
  type: TaskType;
  reason: string;

  priority: TaskPriority;
  status: TaskStatus;

  createdAt: number;
  updatedAt: number;

  retries: number;

  metadata?: Record<string, unknown>;
};