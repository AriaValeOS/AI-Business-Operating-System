import {
  Access,
  Capability,
  Employee,
} from "@/types/employee";
import { Department } from "@/types/goal";

type CreateEmployeeInput = {
  name: string;
  department: Department;
  role: string;
  capabilities: Capability[];
  aiModel: string;
  access: Access[];
  currentTask?: string;
  progress?: number;
};

class EmployeeFactory {
  create(input: CreateEmployeeInput): Employee {
    const now = Date.now();

    return {
      id: crypto.randomUUID(),
      name: input.name,
      department: input.department,
      role: input.role,
      capabilities: input.capabilities,
      status: "idle",
      aiModel: input.aiModel,
      access: input.access,
      currentTask: input.currentTask,
      progress: input.progress,
      createdAt: now,
      updatedAt: now,
    };
  }
}

export const employeeFactory = new EmployeeFactory();