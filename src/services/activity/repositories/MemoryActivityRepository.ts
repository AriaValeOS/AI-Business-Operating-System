import type { ActivityItem } from "@/types/activity";

import type { IActivityRepository } from "./IActivityRepository";

export class MemoryActivityRepository
  implements IActivityRepository
{
  private activities: ActivityItem[] = [];

  async add(
    activity: ActivityItem
  ): Promise<void> {
    this.activities.unshift(activity);
  }

  async getLatest(
    limit = 20
  ) {
    return this.activities.slice(0, limit);
  }

  async clear() {
    this.activities = [];
  }
}