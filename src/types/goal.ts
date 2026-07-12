export type GoalPriority = "low" | "medium" | "high";

export type GoalStatus =
  | "planned"
  | "active"
  | "completed"
  | "paused"
  | "cancelled";

export type Department =
  | "marketing"
  | "sales"
  | "finance"
  | "operations"
  | "support"
  | "analytics"
  | "research";

export type KPI = {
  metric: string;
  target: number;
  current: number;
  unit: string;
};

export type Goal = {
  id: string;

  title: string;

  description?: string;

  priority: GoalPriority;

  department: Department;

  status: GoalStatus;

  kpi: KPI;

  createdAt: number;

  updatedAt: number;

  deadline?: number;
};