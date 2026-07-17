import type { ApplicationModule } from "../ApplicationModule";

export class ActivityModule
  implements ApplicationModule
{
  readonly name = "Activity";

  initialize(): void {
    console.log(
      "[ActivityModule] Ready"
    );
  }
}