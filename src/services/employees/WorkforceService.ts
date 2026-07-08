import { Capability, Employee } from "@/types/employee";
import { Department } from "@/types/goal";
import { workforce } from "./WorkforceRegistry";

class WorkforceService {
  getAll(): Employee[] {
    return workforce;
  }

  findByCapability(capability: Capability): Employee | null {
    return (
      workforce.find((employee) =>
        employee.capabilities.includes(capability)
      ) ?? null
    );
  }

  findByDepartment(department: Department): Employee[] {
    return workforce.filter(
      (employee) => employee.department === department
    );
  }

  findAvailableEmployee(capability: Capability): Employee | null {
    return (
      workforce.find(
        (employee) =>
          employee.status === "idle" &&
          employee.capabilities.includes(capability)
      ) ?? null
    );
  }
}

export const workforceService = new WorkforceService();