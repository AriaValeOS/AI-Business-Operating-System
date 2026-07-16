import type {
  BusinessDecision,
  DecisionActor,
  DecisionCategory,
  DecisionImpact,
  DecisionPriority,
  DecisionRiskLevel,
  DecisionSource,
  DecisionStatus,
} from "@/types/decisions";

interface CreateDecisionInput {
  title: string;
  description: string;
  rationale: string;

  category: DecisionCategory;
  priority?: DecisionPriority;
  riskLevel?: DecisionRiskLevel;
  status?: DecisionStatus;
  source: DecisionSource;

  proposedBy: DecisionActor;
  assignedTo?: DecisionActor;

  impact: DecisionImpact;
  tags?: string[];

  requiresApproval?: boolean;
  scheduledFor?: string;
}

function createDecisionId(): string {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `decision_${Date.now()}_${randomPart}`;
}

export class DecisionFactory {
  static create(input: CreateDecisionInput): BusinessDecision {
    const now = new Date().toISOString();
    const requiresApproval = input.requiresApproval ?? false;

    return {
      id: createDecisionId(),

      title: input.title,
      description: input.description,
      rationale: input.rationale,

      category: input.category,
      priority: input.priority ?? "medium",
      riskLevel: input.riskLevel ?? "low",
      status:
        input.status ??
        (requiresApproval ? "pending-approval" : "approved"),
      source: input.source,

      proposedBy: input.proposedBy,
      assignedTo: input.assignedTo,

      impact: input.impact,

      approval: {
        required: requiresApproval,
        requestedAt: requiresApproval ? now : undefined,
      },

      execution: {},

      tags: input.tags ?? [],

      createdAt: now,
      updatedAt: now,
      scheduledFor: input.scheduledFor,
    };
  }
}