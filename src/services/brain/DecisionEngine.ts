export type Decision = {
  employee: string;
  action: string;
  confidence: number;
  reason: string;
};

class DecisionEngine {
  decide(): Decision {
    return {
      employee: "Aria",
      action: "Generate Instagram carousel",
      confidence: 96,
      reason:
        "Instagram engagement forecast is highest for carousel content today.",
    };
  }
}

export const decisionEngine =
  new DecisionEngine();