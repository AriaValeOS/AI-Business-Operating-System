import {
  Employee,
  Capability,
  Access,
} from "@/types/employee";
import { Department } from "@/types/goal";
type CreateEmployeeInput = {
  name: string;
  department: Department;
  role: string;
  capabilities: Capability[];
  aiModel: string;
  access: Access[];
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
      createdAt: now,
      updatedAt: now,
    };
  }
}

export const employeeFactory = new EmployeeFactory();