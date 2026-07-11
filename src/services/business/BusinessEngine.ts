import { aiSession } from "@/services/session/AISession";
import { BusinessDayResult } from "@/types/business";

class BusinessEngine {
  startBusinessDay(): BusinessDayResult {
    const result = aiSession.run();

    return {
      status: "completed",
      message: result.message,
      queueCount: result.queueCount,
      logs: result.logs,
      completedAt: Date.now(),
    };
  }
}

export const businessEngine = new BusinessEngine();