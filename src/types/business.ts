export type BusinessState =
  | "idle"
  | "running"
  | "completed";

export type BusinessHealth =
  | "Healthy"
  | "Warning"
  | "Critical";

export type BusinessDayStatus =
  | "completed"
  | "failed";

export type BusinessDayResult = {
  status: BusinessDayStatus;
  message: string;
  queueCount: number;
  logs: string[];
  completedAt: number;
};