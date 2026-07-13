import { businessHealthService } from "./BusinessHealthService";

export type RecommendationLevel =
  | "info"
  | "success"
  | "warning"
  | "critical";

export type Recommendation = {
  level: RecommendationLevel;
  title: string;
  message: string;
  action: string;
};

class RecommendationService {
  getRecommendation(): Recommendation {
    const health = businessHealthService.getHealth();

    switch (health.status) {
      case "Healthy":
        return {
          level: "success",
          title: "Business Running Smoothly",
          message: "All core business systems are operating normally.",
          action: "Continue executing today's priorities.",
        };

      case "Warning":
        return {
          level: "warning",
          title: "Business Needs Attention",
          message: "No AI employees are currently working.",
          action: "Start today's business cycle.",
        };

      case "Critical":
        return {
          level: "critical",
          title: "Immediate Action Required",
          message: "Business operations require intervention.",
          action: "Review workforce and active goals immediately.",
        };

      default:
        return {
          level: "info",
          title: "No Recommendation",
          message: "No recommendation available.",
          action: "",
        };
    }
  }
}

export const recommendationService =
  new RecommendationService();