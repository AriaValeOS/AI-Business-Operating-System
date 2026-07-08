import { Goal } from "@/types/goal";
import { Task } from "@/types/task";
import { taskFactory } from "../tasks/TaskFactory";

class WorkflowEngine {
  createTasks(goal: Goal): Task[] {
    switch (goal.department) {
      case "marketing":
        return [
          taskFactory.create({
            type: "generate-story",
            reason: goal.title,
            priority: goal.priority,
          }),

          taskFactory.create({
            type: "create-caption",
            reason: goal.title,
            priority: goal.priority,
          }),

          taskFactory.create({
            type: "create-image-prompt",
            reason: goal.title,
            priority: goal.priority,
          }),
        ];

      case "analytics":
        return [
          taskFactory.create({
            type: "analyze-performance",
            reason: goal.title,
            priority: goal.priority,
          }),
        ];

      default:
        return [];
    }
  }
}

export const workflowEngine = new WorkflowEngine();