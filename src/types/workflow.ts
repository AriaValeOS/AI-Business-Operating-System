import { Task } from "@/types/task";

export type WorkflowStatus =
  | "draft"
  | "active"
  | "running"
  | "completed"
  | "failed"
  | "paused";

export type Workflow = {
  id: string;
  goalId: string;

  title: string;
  description?: string;

  status: WorkflowStatus;

  tasks: Task[];

  createdAt: number;
  updatedAt: number;
};