import { bootstrapManager } from "@/bootstrap/BootstrapManager";

import { ActivityModule } from "@/modules/activity/ActivityModule";
import { BusinessModule } from "@/modules/business/BusinessModule";
import { CoreModule } from "@/modules/core/CoreModule";
import { DecisionModule } from "@/modules/decisions/DecisionModule";

let initialized = false;

export async function initializeBusinessSystem(): Promise<void> {
  if (initialized) {
    return;
  }

  bootstrapManager.register(
    new CoreModule(),
  );

  bootstrapManager.register(
    new BusinessModule(),
  );

  bootstrapManager.register(
    new ActivityModule(),
  );

  bootstrapManager.register(
    new DecisionModule(),
  );

  await bootstrapManager.initialize();

  initialized = true;

  console.log(
    "[AI Business OS] System ready.",
  );
}