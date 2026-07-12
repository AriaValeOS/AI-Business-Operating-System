import { dashboardService } from "@/services/dashboard/DashboardService";
import { goalService } from "@/services/goals/GoalService";

class MorningBriefingService {
  getBriefing() {
    const stats = dashboardService.getStats();
    const goal = goalService.getActiveGoal();

    return {
      greeting: this.getGreeting(),
      title: goal.title,

      summary: `Today's priority is ${goal.department}. Your AI Workforce has ${stats.workforce} employees ready with ${stats.activeTasks} active tasks.`,

      priority: goal.priority,
      businessHealth: stats.businessHealth,
    };
  }

  private getGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  }
}

export const morningBriefingService =
  new MorningBriefingService();