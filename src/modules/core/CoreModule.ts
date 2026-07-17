import type { ApplicationModule } from "../ApplicationModule";

import { registerEventHandlers } from "@/services/events/registerEventHandlers";
import { registerProjections } from "@/services/projections/registerProjections";

export class CoreModule
  implements ApplicationModule
{
  readonly name = "Core";

  initialize(): void {
    registerProjections();
    registerEventHandlers();
  }
}