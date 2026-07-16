import { registerEventHandlers } from "@/services/events/registerEventHandlers";

let systemInitialized = false;

export function initializeBusinessSystem(): void {
  if (systemInitialized) return;

  registerEventHandlers();

  systemInitialized = true;

  console.log(
    "[AI Business OS] Business system initialized."
  );
}