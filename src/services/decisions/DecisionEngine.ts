import { coreDecisionProvider } from "@/services/decisions/providers/CoreDecisionProvider";
import { marketingDecisionProvider } from "@/services/decisions/providers/MarketingDecisionProvider";
import { decisionRanker } from "./DecisionRanker";
import { decisionHistoryService } from "./DecisionHistoryService";

import type {
  BusinessDecision,
  DecisionProvider,
} from "@/services/decisions/DecisionTypes";

class DecisionEngine {
  private readonly providers: DecisionProvider[] = [
    coreDecisionProvider,
    marketingDecisionProvider,
  ];

 evaluate(): BusinessDecision[] {
  const decisions = this.providers.flatMap(
    (provider) => provider.evaluate()
  );

  const rankedDecisions =
    decisionRanker.rank(decisions);

  decisionHistoryService.registerMany(
    rankedDecisions
  );

  return rankedDecisions;
}
  }

export const decisionEngine =
  new DecisionEngine();