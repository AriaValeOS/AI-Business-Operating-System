export interface ActivityItem {
  id: string;

  title: string;

  description: string;

  timestamp: string;

  type:
    | "employee"
    | "decision"
    | "automation"
    | "goal"
    | "system";

  source: string;
}