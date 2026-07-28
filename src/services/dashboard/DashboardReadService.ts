import { activityReadService } from "@/services/activity/ActivityReadService";
import { businessStateService } from "@/services/business/BusinessStateService";
import { workforceReadService } from "@/services/employees/WorkforceReadService";
import { goalService } from "@/services/goals/GoalService";
import { DashboardViewModel } from "@/types/dashboard";

export class DashboardReadService {
  async getDashboard(): Promise<DashboardViewModel> {
    const goal = goalService.getActiveGoal();

    const workforce =
      workforceReadService.getDashboardEmployees();

    const activities =
      await activityReadService.getLatest(20);

    const businessState =
      businessStateService.getState();

    return {
  goal,
  workforce,
  activities,
  businessState,

  inbox: [
    {
      id: "marketing",
      title: "Approve Marketing Campaign",
      priority: "High",
      eta: "5 min",
      icon: "marketing",
    },
    {
      id: "payment",
      title: "Approve Supplier Payment",
      priority: "Medium",
      eta: "2 min",
      icon: "payment",
    },
    {
      id: "contract",
      title: "Review Partnership Agreement",
      priority: "Low",
      eta: "10 min",
      icon: "contract",
    },
  ],
};
  }
}

export const dashboardReadService =
  new DashboardReadService();
  