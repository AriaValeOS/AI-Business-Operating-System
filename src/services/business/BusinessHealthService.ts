import { goalService } from "@/services/goals/GoalService";
import { employeeService } from "@/services/employees/EmployeeService";

export type BusinessHealth =
  | "Healthy"
  | "Warning"
  | "Critical";

export type BusinessHealthReport = {
  status: BusinessHealth;
  reason: string;
};

class BusinessHealthService {
  getHealth(): BusinessHealthReport {
    const goal = goalService.getActiveGoal();
    const employees = employeeService.getEmployees();

    const workingEmployees = employees.filter(
      (employee) => employee.status === "working"
    ).length;

    if (workingEmployees === 0) {
      return {
        status: "Warning",
        reason: "No AI employees are currently working.",
      };
    }

    if (goal.status === "completed") {
      return {
        status: "Healthy",
        reason: "Today's primary goal has been completed.",
      };
    }

    return {
      status: "Healthy",
      reason: "Business operations are running normally.",
    };
  }
}

export const businessHealthService =
  new BusinessHealthService();