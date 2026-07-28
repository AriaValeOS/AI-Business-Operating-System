import type { BusinessDecision } from "./DecisionTypes";

const PRIORITY_WEIGHT = {
  High: 3,
  Medium: 2,
  Low: 1,
} as const;

class DecisionRanker {
  rank(decisions: BusinessDecision[]): BusinessDecision[] {
    const unique = new Map<string, BusinessDecision>();

    for (const decision of decisions) {
      unique.set(decision.id, decision);
    }

    return [...unique.values()].sort(
      (a, b) =>
        PRIORITY_WEIGHT[b.priority] -
        PRIORITY_WEIGHT[a.priority]
    );
  }
}

export const decisionRanker =
  new DecisionRanker();