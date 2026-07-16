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

  updateActivity(
    employeeId: string,
    activity: string
  ): Employee | null {
    const employee = workforce.find(
      (item) => item.id === employeeId
    );

    if (!employee) {
      return null;
    }

    employee.currentActivity = activity;
    employee.updatedAt = Date.now();

    return employee;
  }

  completeActivity(
    employeeId: string,
    result?: string
  ): Employee | null {
    const employee = workforce.find(
      (item) => item.id === employeeId
    );

    if (!employee) {
      return null;
    }

    employee.status = "completed";
    employee.lastCompletedTask =
      result ??
      employee.currentActivity ??
      employee.currentTask ??
      "Task completed";

    employee.currentActivity = undefined;
    employee.progress = 100;
    employee.updatedAt = Date.now();

    return employee;
  }

  clearActivity(employeeId: string): Employee | null {
    const employee = workforce.find(
      (item) => item.id === employeeId
    );

    if (!employee) {
      return null;
    }

    employee.currentActivity = undefined;
    employee.updatedAt = Date.now();

    return employee;
  }

  clearAllActivities(): Employee[] {
    const now = Date.now();

    workforce.forEach((employee) => {
      employee.currentActivity = undefined;
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
    const now = Date.now();

    workforce.forEach((employee) => {
      employee.status = "idle";
      employee.currentActivity = undefined;
      employee.updatedAt = now;
    });

    return workforce;
  }
}

export const workforceService = new WorkforceService();