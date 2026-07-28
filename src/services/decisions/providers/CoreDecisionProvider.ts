import { businessHealthService } from "@/services/business/BusinessHealthService";
import { workforceService } from "@/services/employees/WorkforceService";

import type {
  BusinessDecision,
  DecisionProvider,
} from "@/services/decisions/DecisionTypes";

class CoreDecisionProvider implements DecisionProvider {
  evaluate(): BusinessDecision[] {
    const health =
      businessHealthService.getHealth();

    const employees =
      workforceService.getAll();

    const workingEmployees = employees.filter(
      (employee) => employee.status === "working"
    );

    const decisions: BusinessDecision[] = [];

    if (workingEmployees.length === 0) {
      decisions.push({
        id: "start-business-cycle",
        title: "Start AI Business Cycle",
        reason:
          "No AI employees are currently working.",
        priority: "High",
        eta: "1 min",
        icon: "contract",
      });
    }

    if (health.status === "Critical") {
      decisions.push({
        id: "review-business-health",
        title: "Review Business Health",
        reason: health.reason,
        priority: "High",
        eta: "3 min",
        icon: "contract",
      });
    }

    return decisions;
  }
}

export const coreDecisionProvider =
  new CoreDecisionProvider();