import { activityReadService } from "@/services/activity/ActivityReadService";
import { businessStateService } from "@/services/business/BusinessStateService";
import { morningBriefingService } from "@/services/business/MorningBriefingService";
import { recommendationService } from "@/services/business/RecommendationService";
import { dashboardService } from "@/services/dashboard/DashboardService";
import { businessHealthService } from "@/services/business/BusinessHealthService";
import type { WorkforceDashboardEmployee } from "@/services/employees/WorkforceReadService";
import type { Goal } from "@/types/goal";

export type DashboardBusinessHealth = ReturnType<
  typeof businessHealthService.getHealth
>;
export type DashboardActivity = Awaited<
  ReturnType<typeof activityReadService.getLatest>
>[number];
export type DashboardBusinessState = ReturnType<
  typeof businessStateService.getState
>;

export interface FounderInboxItem {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  eta: string;
  icon: "marketing" | "payment" | "contract";
}

export interface ExecutiveBriefingViewModel {
  goal: Goal;

  briefing: ReturnType<
    typeof morningBriefingService.getBriefing
  >;

  stats: ReturnType<
    typeof dashboardService.getStats
  >;

  recommendation: ReturnType<
    typeof recommendationService.getRecommendation
  >;

  businessState: DashboardBusinessState;
}

export interface DashboardViewModel {
  goal: Goal;
  workforce: WorkforceDashboardEmployee[];
  activities: DashboardActivity[];
  businessState: DashboardBusinessState;
  inbox: FounderInboxItem[];
  executiveBriefing: ExecutiveBriefingViewModel;
  businessHealth: DashboardBusinessHealth;
}