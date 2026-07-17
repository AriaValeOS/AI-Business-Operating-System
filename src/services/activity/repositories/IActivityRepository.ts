import type { ActivityItem } from "@/types/activity";

export interface IActivityRepository {
  add(
    activity: ActivityItem
  ): Promise<void>;

  getLatest(
    limit?: number
  ): Promise<ActivityItem[]>;

  clear(): Promise<void>;
}