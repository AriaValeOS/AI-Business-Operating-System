import type { BusinessDecision } from "@/types/decisions";
import type { IDecisionRepository } from "./IDecisionRepository";

export class MemoryDecisionRepository
  implements IDecisionRepository
{
  private decisions: BusinessDecision[] = [];

  getAll(): BusinessDecision[] {
    return [...this.decisions];
  }

  getById(id: string) {
    return this.decisions.find(
      (decision) => decision.id === id
    );
  }

  save(decision: BusinessDecision): void {
    this.decisions.unshift(decision);
  }

  update(decision: BusinessDecision): void {
    const index = this.decisions.findIndex(
      (item) => item.id === decision.id
    );

    if (index === -1) return;

    this.decisions[index] = decision;
  }

  delete(id: string): void {
    this.decisions = this.decisions.filter(
      (decision) => decision.id !== id
    );
  }

  clear(): void {
    this.decisions = [];
  }

  count(): number {
    return this.decisions.length;
  }

  getLatest(limit = 10) {
    return this.decisions.slice(0, limit);
  }
}