import { companyService } from "@/services/company/CompanyService";
import { goalService } from "@/services/goals/GoalService";
import { taskService } from "@/services/tasks/TaskService";
import { workforceService } from "@/services/employees/WorkforceService";

import { DashboardState } from "@/types/dashboard";

class DashboardService {
  getState(): DashboardState {
    const activeGoal = goalService.getActiveGoal();

    return {
      company: companyService.getCompany(),
      activeGoal,
      employees: workforceService.getAll(),
      tasks: taskService.getTasksForGoal(activeGoal),
    };
  }
}

export const dashboardService = new DashboardService();