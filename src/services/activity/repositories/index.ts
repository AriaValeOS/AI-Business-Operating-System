import { MemoryActivityRepository } from "./MemoryActivityRepository";

export const activityRepository =
  new MemoryActivityRepository();

export * from "./IActivityRepository";