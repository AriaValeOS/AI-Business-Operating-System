import type { BusinessDecision } from "@/types/decisions";

class DecisionRepository {
  private decisions: BusinessDecision[] = [];

  getAll(): BusinessDecision[] {
    return [...this.decisions];
  }

  getById(id: string): BusinessDecision | undefined {
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

  getLatest(limit = 10): BusinessDecision[] {
    return this.decisions.slice(0, limit);
  }
}

export const decisionRepository =
  new DecisionRepository();