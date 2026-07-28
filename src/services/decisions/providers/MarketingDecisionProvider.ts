import { goalService } from "@/services/goals/GoalService";

import type {
  BusinessDecision,
  DecisionProvider,
} from "@/services/decisions/DecisionTypes";

class MarketingDecisionProvider
  implements DecisionProvider
{
  evaluate(): BusinessDecision[] {
    const goal =
      goalService.getActiveGoal();

    const decisions: BusinessDecision[] = [];

    if (
      goal.department === "marketing" &&
      goal.status !== "completed"
    ) {
      decisions.push({
        id: "approve-marketing",
        title: "Approve Marketing Campaign",
        reason:
          "The active marketing goal still requires execution.",
        priority: "Medium",
        eta: "5 min",
        icon: "marketing",
      });
    }

    return decisions;
  }
}

export const marketingDecisionProvider =
  new MarketingDecisionProvider();