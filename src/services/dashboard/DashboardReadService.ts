import { activityReadService } from "@/services/activity/ActivityReadService";
import { businessStateService } from "@/services/business/BusinessStateService";
import { workforceReadService } from "@/services/employees/WorkforceReadService";
import { goalService } from "@/services/goals/GoalService";
import { DashboardViewModel } from "@/types/dashboard";
import { businessHealthService } from "@/services/business/BusinessHealthService";
import { morningBriefingService } from "@/services/business/MorningBriefingService";
import { recommendationService } from "@/services/business/RecommendationService";
import { dashboardService } from "@/services/dashboard/DashboardService";
import { founderInboxService } from "@/services/decisions/FounderInboxService";

export class DashboardReadService {
  async getDashboard(): Promise<DashboardViewModel> {
    const goal = goalService.getActiveGoal();
const inbox = founderInboxService.getItems();
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
  inbox,

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
  