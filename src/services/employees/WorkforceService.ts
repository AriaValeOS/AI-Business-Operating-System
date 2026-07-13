import {
  Capability,
  Employee,
  EmployeeStatus,
} from "@/types/employee";
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

  updateStatus(
    employeeId: string,
    status: EmployeeStatus
  ): Employee | null {
    const employee = workforce.find(
      (item) => item.id === employeeId
    );

    if (!employee) {
      return null;
    }

    employee.status = status;
    employee.updatedAt = Date.now();

    return employee;
  }

  updateAllStatuses(status: EmployeeStatus): Employee[] {
    const now = Date.now();

    workforce.forEach((employee) => {
      employee.status = status;
      employee.updatedAt = now;
    });

    return workforce;
  }

  startWorkforce(): Employee[] {
    return this.updateAllStatuses("working");
  }

  completeWorkforce(): Employee[] {
    return this.updateAllStatuses("completed");
  }

  resetWorkforce(): Employee[] {
    return this.updateAllStatuses("idle");
  }
}

export const workforceService = new WorkforceService();