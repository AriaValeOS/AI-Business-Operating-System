import { goalFactory } from "@/services/goals/GoalFactory";
import { workflowEngine } from "@/services/workflows/WorkflowEngine";

export function runBusinessCycleDemo() {
  const goal = goalFactory.create({
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

  const tasks = workflowEngine.createTasks(goal);

  console.group("🚀 AI Business Operating System Demo");

  console.log("Goal");
  console.log(goal);

  console.log("Generated Tasks");
  console.table(tasks);

  console.groupEnd();

  return {
    goal,
    tasks,
  };
}