export type TaskType =
  | "generate-story"
  | "create-caption"
  | "create-image-prompt"
  | "analyze-performance";

export type Task = {
  type: TaskType;
  reason: string;
  priority: "low" | "medium" | "high";
};