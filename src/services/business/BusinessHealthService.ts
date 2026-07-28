import { employeeService } from "@/services/employees/EmployeeService";
import { goalService } from "@/services/goals/GoalService";

export type BusinessHealth =
  | "Healthy"
  | "Warning"
  | "Critical";

export type BusinessHealthReport = {
  score: number;
  status: BusinessHealth;
  reason: string;
  insight: string;
};

class BusinessHealthService {
  getHealth(): BusinessHealthReport {
    const goal = goalService.getActiveGoal();
    const employees = employeeService.getEmployees();

    const workingEmployees = employees.filter(
      (employee) => employee.status === "working",
    ).length;

    const goalProgress =
      goal.kpi.target > 0
        ? Math.min(
            100,
            Math.max(
              0,
              Math.round(
                (goal.kpi.current / goal.kpi.target) * 100,
              ),
            ),
          )
        : 0;

    if (goal.status === "completed") {
      return {
        score: 100,
        status: "Healthy",
        reason: "Today's primary goal has been completed.",
        insight:
          "The primary business objective is complete. The AI workforce can prepare the next priority.",
      };
    }

    if (workingEmployees === 0 && goalProgress === 0) {
      return {
        score: 40,
        status: "Warning",
        reason: "No AI employees are currently working.",
        insight:
          "Start today's business cycle so the AI workforce can begin executing the active goal.",
      };
    }

    if (workingEmployees === 0) {
      return {
        score: Math.max(50, goalProgress),
        status: "Warning",
        reason:
          "The active goal has progress, but no AI employees are currently working.",
        insight:
          "Resume the business cycle to continue progress toward the current KPI target.",
      };
    }

    if (goalProgress < 50) {
      return {
        score: Math.max(55, goalProgress),
        status: "Warning",
        reason:
          "AI employees are working, but the active goal is still below 50% completion.",
        insight:
          "Business operations are active. Continue focusing the AI workforce on the current priority.",
      };
    }

    return {
      score: Math.max(75, goalProgress),
      status: "Healthy",
      reason: "Business operations are running normally.",
      insight:
        "The AI workforce is actively progressing toward the current business milestone.",
    };
  }
}

export const businessHealthService =
  new BusinessHealthService();