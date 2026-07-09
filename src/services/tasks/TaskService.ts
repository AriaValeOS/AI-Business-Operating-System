import { Goal } from "@/types/goal";
import { Task } from "@/types/task";
import { workflowEngine } from "../workflows/WorkflowEngine";

class TaskService {
  getTasksForGoal(goal: Goal): Task[] {
    return workflowEngine.createTasks(goal);
  }
}

export const taskService = new TaskService();