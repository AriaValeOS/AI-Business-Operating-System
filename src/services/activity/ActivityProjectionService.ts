import type { ActivityItem } from "@/types/activity";
import type { BusinessEvent } from "@/types/events";

import type { IProjection } from "@/services/projections/IProjection";

import { activityRepository } from "./repositories";

class ActivityProjectionService implements IProjection {
  readonly name = "activity";

  async project(event: BusinessEvent): Promise<void> {
    const activity: ActivityItem = {
      id: event.id,
      title: this.buildTitle(event),
      description: this.buildDescription(event),
      timestamp: event.occurredAt,
      type: this.resolveType(event.type),
      source: event.source,
    };

    await activityRepository.add(activity);
  }

  async reset(): Promise<void> {
    await activityRepository.clear();
  }

  private buildTitle(event: BusinessEvent): string {
    const payload = event.payload as Record<
      string,
      unknown
    >;

    const employeeName =
      typeof payload.employeeName === "string"
        ? payload.employeeName
        : "AI employee";

    switch (event.type) {
      case "employee.started":
        return `${employeeName} started working`;

      case "employee.progressed":
        return `${employeeName} updated progress`;

      case "employee.completed":
        return `${employeeName} completed a task`;

      case "employee.failed":
        return `${employeeName} encountered an error`;

      case "decision.created":
        return "New decision created";

      case "decision.approval-requested":
        return "Decision requires approval";

      case "decision.approved":
        return "Decision approved";

      case "decision.rejected":
        return "Decision rejected";

      case "decision.execution-started":
        return "Decision execution started";

      case "decision.completed":
        return "Decision completed";

      case "decision.failed":
        return "Decision execution failed";

      case "business-cycle.started":
        return "Business cycle started";

      case "business-cycle.completed":
        return "Business cycle completed";

      case "automation.started":
        return "Automation started";

      case "automation.completed":
        return "Automation completed";

      case "automation.failed":
        return "Automation failed";

      case "goal.created":
        return "Business goal created";

      case "goal.updated":
        return "Business goal updated";

      case "goal.completed":
        return "Business goal completed";

      case "system.heartbeat":
        return "System heartbeat received";

      default:
        return event.type;
    }
  }

  private buildDescription(
    event: BusinessEvent
  ): string {
    const payload = event.payload as Record<
      string,
      unknown
    >;

    const activity =
      typeof payload.activity === "string"
        ? payload.activity
        : undefined;

    const completedTask =
      typeof payload.completedTask === "string"
        ? payload.completedTask
        : undefined;

    const progress =
      typeof payload.progress === "number"
        ? payload.progress
        : undefined;

    if (completedTask) {
      return completedTask;
    }

    if (activity && progress !== undefined) {
      return `${activity} · ${progress}%`;
    }

    if (activity) {
      return activity;
    }

    if (progress !== undefined) {
      return `Progress: ${progress}%`;
    }

    return `Event received from ${event.source}`;
  }

  private resolveType(
    type: string
  ): ActivityItem["type"] {
    if (type.startsWith("employee.")) {
      return "employee";
    }

    if (type.startsWith("decision.")) {
      return "decision";
    }

    if (type.startsWith("automation.")) {
      return "automation";
    }

    if (type.startsWith("goal.")) {
      return "goal";
    }

    return "system";
  }
}

export const activityProjection =
  new ActivityProjectionService();