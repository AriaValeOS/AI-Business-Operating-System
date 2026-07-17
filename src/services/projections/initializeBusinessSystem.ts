import { registerEventHandlers } from "@/services/events/registerEventHandlers";
import { registerProjections } from "@/services/projections";

let systemInitialized = false;

export function initializeBusinessSystem(): void {
  if (systemInitialized) {
    return;
  }

  registerProjections();
  registerEventHandlers();

  systemInitialized = true;

  console.log(
    "[AI Business OS] Business system initialized."
  );
}