import { goalFactory } from "./GoalFactory";
import { Goal } from "@/types/goal";

class GoalService {
  private activeGoal: Goal;

  constructor() {
    this.activeGoal = goalFactory.create({
      title: "Today's Instagram Content",
      priority: "high",
      department: "marketing",
      kpi: {
        metric: "Published Posts",
        target: 1,
        current: 0,
        unit: "post",
      },
    });
  }

  getActiveGoal(): Goal {
    return this.activeGoal;
  }

  updateKPI(value: number) {
    this.activeGoal.kpi.current = value;
    this.activeGoal.updatedAt = Date.now();
  }

  completeGoal() {
    this.activeGoal.status = "completed";
    this.activeGoal.updatedAt = Date.now();
  }
}

export const goalService = new GoalService();