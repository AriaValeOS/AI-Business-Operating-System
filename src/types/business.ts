export type BusinessDayStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";

export type BusinessDayResult = {
  status: BusinessDayStatus;
  message: string;
  queueCount: number;
  logs: string[];
  completedAt?: number;
};