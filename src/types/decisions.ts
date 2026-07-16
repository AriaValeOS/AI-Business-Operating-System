export type DecisionStatus =
  | "draft"
  | "pending-approval"
  | "approved"
  | "rejected"
  | "scheduled"
  | "executing"
  | "completed"
  | "failed"
  | "cancelled";

export type DecisionPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type DecisionRiskLevel =
  | "low"
  | "medium"
  | "high";

export type DecisionCategory =
  | "operations"
  | "sales"
  | "marketing"
  | "finance"
  | "customer-success"
  | "workforce"
  | "strategy"
  | "automation"
  | "system";

export type DecisionSource =
  | "brain"
  | "business-engine"
  | "employee"
  | "founder"
  | "automation"
  | "system";

export type DecisionActorType =
  | "founder"
  | "ai-employee"
  | "system";

export interface DecisionActor {
  id: string;
  name: string;
  type: DecisionActorType;
}

export interface DecisionImpact {
  summary: string;
  estimatedValue?: number;
  currency?: string;
  affectedAreas: string[];
}

export interface DecisionExecution {
  startedAt?: string;
  completedAt?: string;
  errorMessage?: string;
  resultSummary?: string;
}

export interface DecisionApproval {
  required: boolean;
  requestedAt?: string;
  reviewedAt?: string;
  reviewedBy?: DecisionActor;
  rejectionReason?: string;
}

export interface BusinessDecision {
  id: string;

  title: string;
  description: string;
  rationale: string;

  category: DecisionCategory;
  priority: DecisionPriority;
  riskLevel: DecisionRiskLevel;
  status: DecisionStatus;
  source: DecisionSource;

  proposedBy: DecisionActor;
  assignedTo?: DecisionActor;

  impact: DecisionImpact;
  approval: DecisionApproval;
  execution: DecisionExecution;

  tags: string[];

  createdAt: string;
  updatedAt: string;
  scheduledFor?: string;
}