import { MemoryBusinessEventRepository } from "./MemoryBusinessEventRepository";

export const businessEventRepository =
  new MemoryBusinessEventRepository();

export * from "./IBusinessEventRepository";