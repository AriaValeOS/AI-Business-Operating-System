import { decisionEngine } from "./DecisionEngine";
import { decisionHistoryService } from "./DecisionHistoryService";

import type { FounderInboxItem } from "@/types/dashboard";

class FounderInboxService {
  getItems(): FounderInboxItem[] {
    decisionEngine.evaluate();

    return decisionHistoryService
      .getPending()
      .slice(0, 5)
      .map(({ decision }) => ({
        id: decision.id,
        title: decision.title,
        priority: decision.priority,
        eta: decision.eta,
        icon: decision.icon,
      }));
  }
}

export const founderInboxService =
  new FounderInboxService();