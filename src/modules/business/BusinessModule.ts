import type {
  ApplicationModule,
} from "@/modules/ApplicationModule";

import {
  businessRepository,
} from "./composition";

export class BusinessModule
  implements ApplicationModule
{
  readonly name = "Business";

  async initialize(): Promise<void> {
    const businesses =
      await businessRepository.findAll();

    console.log(
      `[BusinessModule] Ready with ${businesses.length} businesses`,
    );
  }
}