import { goalService } from "@/services/goals/GoalService";
import { employeeService } from "@/services/employees/EmployeeService";

class DashboardService {
  getStats() {
    const goal = goalService.getActiveGoal();
    const employees = employeeService.getEmployees();

    return {
      activeGoals: goal.status === "completed" ? 0 : 1,
      workforce: employees.length,
      activeTasks: employees.filter(
        (employee) => employee.currentTask
      ).length,
      businessHealth: "Healthy",
    };
  }
}

export const dashboardService = new DashboardService();