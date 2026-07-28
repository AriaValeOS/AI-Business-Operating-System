import { activityReadService } from "@/services/activity/ActivityReadService";
import { businessStateService } from "@/services/business/BusinessStateService";
import { WorkforceDashboardEmployee } from "@/services/employees/WorkforceReadService";
import { Goal } from "@/types/goal";
import { BusinessState } from "./business";

export type DashboardActivity = Awaited<
  ReturnType<typeof activityReadService.getLatest>
>[number];

export type DashboardBusinessState = ReturnType<
  typeof businessStateService.getState
>;

export interface DashboardViewModel {
  goal: Goal;
  workforce: WorkforceDashboardEmployee[];
  activities: DashboardActivity[];
  businessState: DashboardBusinessState;
}
export interface FounderInboxItem {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  eta: string;
  icon:
    | "marketing"
    | "payment"
    | "contract";
}
export interface DashboardViewModel {
  goal: Goal;
  workforce: WorkforceDashboardEmployee[];
  activities: DashboardActivity[];
  businessState: BusinessState;

  inbox: FounderInboxItem[];
}