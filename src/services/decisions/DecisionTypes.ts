export type DecisionPriority =
  | "High"
  | "Medium"
  | "Low";

export type DecisionIcon =
  | "marketing"
  | "payment"
  | "contract";

export interface BusinessDecision {
  id: string;
  title: string;
  reason: string;
  priority: DecisionPriority;
  eta: string;
  icon: DecisionIcon;
}

export interface DecisionProvider {
  evaluate(): BusinessDecision[];
}