import type { BusinessDecision } from "./DecisionTypes";

export type DecisionStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "deferred";

export interface DecisionHistoryEntry {
  decision: BusinessDecision;
  status: DecisionStatus;
  createdAt: string;
  updatedAt: string;
}

class DecisionHistoryService {
  private readonly entries =
    new Map<string, DecisionHistoryEntry>();

  register(decision: BusinessDecision): void {
    if (this.entries.has(decision.id)) {
      return;
    }

    const timestamp = new Date().toISOString();

    this.entries.set(decision.id, {
      decision,
      status: "pending",
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }

  registerMany(decisions: BusinessDecision[]): void {
    for (const decision of decisions) {
      this.register(decision);
    }
  }

  getAll(): DecisionHistoryEntry[] {
    return [...this.entries.values()];
  }

  getPending(): DecisionHistoryEntry[] {
    return this.getAll().filter(
      (entry) => entry.status === "pending"
    );
  }

  updateStatus(
    decisionId: string,
    status: DecisionStatus
  ): boolean {
    const entry = this.entries.get(decisionId);

    if (!entry) {
      return false;
    }

    this.entries.set(decisionId, {
      ...entry,
      status,
      updatedAt: new Date().toISOString(),
    });

    return true;
  }
}

export const decisionHistoryService =
  new DecisionHistoryService();