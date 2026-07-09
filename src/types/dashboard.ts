import { Company } from "@/types/company";
import { Employee } from "@/types/employee";
import { Goal } from "@/types/goal";
import { Task } from "@/types/task";

export type DashboardState = {
  company: Company;
  activeGoal: Goal;
  employees: Employee[];
  tasks: Task[];
};