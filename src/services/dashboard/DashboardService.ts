import { goalService } from "@/services/goals/GoalService";
import { employeeService } from "@/services/employees/EmployeeService";
import { businessHealthService } from "@/services/business/BusinessHealthService";

class DashboardService {
  getStats() {
    const goal = goalService.getActiveGoal();
    const employees = employeeService.getEmployees();

    const health = businessHealthService.getHealth();

    return {
      activeGoals: goal.status === "completed" ? 0 : 1,

      workforce: employees.length,

      activeTasks: employees.filter(
        (employee) => employee.currentTask
      ).length,

      businessHealth: health.status,

      businessHealthReason: health.reason,
    };
  }
}

export const dashboardService = new DashboardService();