import {
  Goal,
  GoalPriority,
  Department,
  KPI,
} from "@/types/goal";

type CreateGoalInput = {
  title: string;
  description?: string;
  priority: GoalPriority;
  department: Department;
  kpi: KPI;
  deadline?: number;
};

class GoalFactory {
  create(input: CreateGoalInput): Goal {
    const now = Date.now();

    return {
      id: crypto.randomUUID(),

      title: input.title,

      description: input.description,

      priority: input.priority,

      department: input.department,

      status: "planned",

      kpi: input.kpi,

      createdAt: now,

      updatedAt: now,

      deadline: input.deadline,
    };
  }
}

export const goalFactory = new GoalFactory();