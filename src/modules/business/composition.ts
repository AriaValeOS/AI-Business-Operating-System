import {
  CreateBusinessUseCase,
} from "./application";

import {
  MemoryBusinessRepository,
} from "./infrastructure";

export const businessRepository =
  new MemoryBusinessRepository();

export const createBusinessUseCase =
  new CreateBusinessUseCase(
    businessRepository,
  );