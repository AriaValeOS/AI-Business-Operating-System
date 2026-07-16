import type { BusinessDecision } from "@/types/decisions";

export interface IDecisionRepository {
  getAll(): BusinessDecision[];

  getById(
    id: string
  ): BusinessDecision | undefined;

  save(
    decision: BusinessDecision
  ): void;

  update(
    decision: BusinessDecision
  ): void;

  delete(
    id: string
  ): void;

  clear(): void;

  count(): number;

  getLatest(
    limit?: number
  ): BusinessDecision[];
}