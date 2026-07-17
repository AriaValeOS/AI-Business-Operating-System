import type { ApplicationModule } from "../ApplicationModule";

export class DecisionModule
  implements ApplicationModule
{
  readonly name = "Decision";

  initialize(): void {
    console.log(
      "[DecisionModule] Ready"
    );
  }
}