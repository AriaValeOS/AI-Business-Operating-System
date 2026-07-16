import { workforceService } from "./WorkforceService";
import {
  businessEventBus,
  BusinessEventFactory,
} from "@/services/events";

class EmployeeRunner {
  run(
    onRefresh: () => void,
    onFinished?: () => void
  ) {
    const employees = workforceService.getAll();

    workforceService.resetWorkforce();

    employees.forEach((employee, index) => {
      const start = 800 * index;
      const correlationId = `employee-cycle-${employee.id}`;

      // Employee started
      window.setTimeout(async () => {
        workforceService.updateStatus(
          employee.id,
          "working"
        );

        workforceService.updateActivity(
          employee.id,
          this.getFirstActivity(employee.name)
        );

        employee.progress = 15;

        await businessEventBus.publish(
          BusinessEventFactory.create({
            type: "employee.started",
            source: "employee-runner",
            payload: {
              employeeId: employee.id,
              employeeName: employee.name,
              activity: employee.currentActivity,
              progress: employee.progress,
            },
            metadata: {
              correlationId,
            },
          })
        );

        onRefresh();
      }, start);

      // Progress #1
      window.setTimeout(async () => {
        workforceService.updateActivity(
          employee.id,
          this.getSecondActivity(employee.name)
        );

        employee.progress = 45;

        await businessEventBus.publish(
          BusinessEventFactory.create({
            type: "employee.progressed",
            source: "employee-runner",
            payload: {
              employeeId: employee.id,
              employeeName: employee.name,
              activity: employee.currentActivity,
              progress: employee.progress,
            },
            metadata: {
              correlationId,
            },
          })
        );

        onRefresh();
      }, start + 900);

      // Progress #2
      window.setTimeout(async () => {
        workforceService.updateActivity(
          employee.id,
          this.getThirdActivity(employee.name)
        );

        employee.progress = 80;

        await businessEventBus.publish(
          BusinessEventFactory.create({
            type: "employee.progressed",
            source: "employee-runner",
            payload: {
              employeeId: employee.id,
              employeeName: employee.name,
              activity: employee.currentActivity,
              progress: employee.progress,
            },
            metadata: {
              correlationId,
            },
          })
        );

        onRefresh();
      }, start + 1800);

      // Completed
      window.setTimeout(async () => {
        workforceService.completeActivity(
          employee.id
        );

        employee.progress = 100;

        await businessEventBus.publish(
          BusinessEventFactory.create({
            type: "employee.completed",
            source: "employee-runner",
            payload: {
              employeeId: employee.id,
              employeeName: employee.name,
              completedTask:
                employee.lastCompletedTask,
              progress: employee.progress,
            },
            metadata: {
              correlationId,
            },
          })
        );

        onRefresh();
      }, start + 2600);
    });

    const duration =
      employees.length * 800 + 3000;

    window.setTimeout(() => {
      onFinished?.();
    }, duration);
  }

  private getFirstActivity(name: string): string {
    switch (name) {
      case "Aria":
        return "Planning today's content";

      case "Atlas":
        return "Collecting analytics";

      case "Nova":
        return "Researching market trends";

      default:
        return "Thinking";
    }
  }

  private getSecondActivity(name: string): string {
    switch (name) {
      case "Aria":
        return "Generating images";

      case "Atlas":
        return "Building performance report";

      case "Nova":
        return "Summarizing research";

      default:
        return "Working";
    }
  }

  private getThirdActivity(name: string): string {
    switch (name) {
      case "Aria":
        return "Writing captions";

      case "Atlas":
        return "Preparing recommendations";

      case "Nova":
        return "Preparing knowledge base";

      default:
        return "Finishing task";
    }
  }
}

export const employeeRunner =
  new EmployeeRunner();