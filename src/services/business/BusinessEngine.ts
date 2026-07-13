import { aiSession } from "@/services/session/AISession";
import { BusinessDayResult } from "@/types/business";
import { workforceService } from "@/services/employees/WorkforceService";

class BusinessEngine {
  startBusinessDay(): BusinessDayResult {
  const lifecycleLogs: string[] = [];

  this.runMorningBriefing(lifecycleLogs);

  workforceService.startWorkforce();
  lifecycleLogs.push("AI Workforce started.");

  const result = this.executeBusinessCycle();

  this.updateKPIs(lifecycleLogs);

  workforceService.completeWorkforce();
  lifecycleLogs.push("AI Workforce completed.");

  this.finishBusinessDay(lifecycleLogs);

  return {
    status: "completed",
    message: result.message,
    queueCount: result.queueCount,
    logs: [...lifecycleLogs, ...result.logs],
    completedAt: Date.now(),
  };
}

  private runMorningBriefing(logs: string[]) {
    logs.push("Morning briefing completed.");
  }

  private executeBusinessCycle() {
    return aiSession.run();
  }

  private updateKPIs(logs: string[]) {
    logs.push("KPIs updated.");
  }

  private finishBusinessDay(logs: string[]) {
    logs.push("Business day completed.");
  }
}

export const businessEngine = new BusinessEngine();