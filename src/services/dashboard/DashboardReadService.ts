import { activityReadService } from "@/services/activity/ActivityReadService";
import { businessStateService } from "@/services/business/BusinessStateService";
import { workforceReadService } from "@/services/employees/WorkforceReadService";
import { goalService } from "@/services/goals/GoalService";
import { DashboardViewModel } from "@/types/dashboard";
import { businessHealthService } from "@/services/business/BusinessHealthService";
import { morningBriefingService } from "@/services/business/MorningBriefingService";
import { recommendationService } from "@/services/business/RecommendationService";
import { dashboardService } from "@/services/dashboard/DashboardService";

export class DashboardReadService {
  async getDashboard(): Promise<DashboardViewModel> {
    const goal = goalService.getActiveGoal();

    const workforce =
      workforceReadService.getDashboardEmployees();

    const activities =
      await activityReadService.getLatest(20);

    const businessState =
      businessStateService.getState();
const briefing =
  morningBriefingService.getBriefing();

const stats =
  dashboardService.getStats();

const recommendation =
  recommendationService.getRecommendation();
const businessHealth =
  businessHealthService.getHealth();
    return {
  goal,
  workforce,
  activities,
  businessState,
  businessHealth,

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

  executiveBriefing: {
    goal,
    briefing,
    stats,
    recommendation,
    businessState,
  },
};
  }
}

export const dashboardReadService =
  new DashboardReadService();
  