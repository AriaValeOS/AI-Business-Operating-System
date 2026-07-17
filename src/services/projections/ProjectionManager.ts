import type { BusinessEvent } from "@/types/events";

import type { IProjection } from "./IProjection";

class ProjectionManager {
  private readonly projections =
    new Map<string, IProjection>();

  register(projection: IProjection): void {
    if (this.projections.has(projection.name)) {
      return;
    }

    this.projections.set(
      projection.name,
      projection
    );
  }

  unregister(name: string): void {
    this.projections.delete(name);
  }

  has(name: string): boolean {
    return this.projections.has(name);
  }

  getRegisteredNames(): string[] {
    return Array.from(this.projections.keys());
  }

  async project(
    event: BusinessEvent
  ): Promise<void> {
    const projections = Array.from(
      this.projections.values()
    );

    const results = await Promise.allSettled(
      projections.map((projection) =>
        projection.project(event)
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        return;
      }

      const projection = projections[index];

      console.error(
        `[ProjectionManager] Projection "${projection.name}" failed for event "${event.type}":`,
        result.reason
      );
    });
  }

  async resetAll(): Promise<void> {
    const resettableProjections = Array.from(
      this.projections.values()
    ).filter(
      (
        projection
      ): projection is IProjection & {
        reset: () => Promise<void>;
      } => typeof projection.reset === "function"
    );

    const results = await Promise.allSettled(
      resettableProjections.map((projection) =>
        projection.reset()
      )
    );

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        return;
      }

      console.error(
        `[ProjectionManager] Failed to reset projection "${resettableProjections[index].name}":`,
        result.reason
      );
    });
  }

  clearRegistry(): void {
    this.projections.clear();
  }
}

export const projectionManager =
  new ProjectionManager();