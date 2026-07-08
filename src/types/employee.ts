import { Department } from "@/types/goal";

export type EmployeeStatus =
  | "idle"
  | "working"
  | "offline"
  | "waiting-for-approval";

export type Capability =
  | "generate-story"
  | "create-caption"
  | "create-image-prompt"
  | "analyze-performance"
  | "publish-content"
  | "send-email"
  | "manage-calendar";

export type Access =
  | "instagram"
  | "gmail"
  | "calendar"
  | "stripe"
  | "shopify"
  | "slack";

export type Employee = {
  id: string;
  name: string;
  department: Department;
  role: string;
  capabilities: Capability[];
  status: EmployeeStatus;
  aiModel: string;
  access: Access[];
  createdAt: number;
  updatedAt: number;
};