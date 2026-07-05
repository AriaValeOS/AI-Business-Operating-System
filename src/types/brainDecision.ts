export type BrainDecision = {
  task: "instagram-content" | "analytics-report";
  reason: string;
  agent: "InstagramAgent" | "AnalyticsAgent";
};