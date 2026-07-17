import { projectionManager } from "../projections";
import { businessEventBus } from "./index";

let handlersRegistered = false;

export function registerEventHandlers(): void {
  if (handlersRegistered) {
    return;
  }

  businessEventBus.subscribeToAll(async (event) => {
    await projectionManager.project(event);
  });

  businessEventBus.subscribeToAll(async (event) => {
    console.log(`[Business Event] ${event.type}`, {
      id: event.id,
      source: event.source,
      payload: event.payload,
      occurredAt: event.occurredAt,
    });
  });

  handlersRegistered = true;
}