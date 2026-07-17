import { activityProjection } from "@/services/activity/ActivityProjectionService";

import { projectionManager } from "./ProjectionManager";

let projectionsRegistered = false;

export function registerProjections(): void {
  if (projectionsRegistered) {
    return;
  }

  projectionManager.register(
    activityProjection
  );

  projectionsRegistered = true;

  console.log(
    "[AI Business OS] Projections registered:",
    projectionManager.getRegisteredNames()
  );
}