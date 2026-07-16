import { MemoryDecisionRepository } from "./MemoryDecisionRepository";

export const decisionRepository =
  new MemoryDecisionRepository();

export * from "./IDecisionRepository";