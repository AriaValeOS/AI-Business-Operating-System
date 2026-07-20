import { workforceService } from "./WorkforceService";

export type WorkforceDashboardEmployee = {
  id: string;
  name: string;
  role: string;
  status: string;
  task: string;
  progress: number;
  eta: string;
};

class WorkforceReadService {
  getDashboardEmployees(): WorkforceDashboardEmployee[] {
    return workforceService.getAll().map((employee) => {
      const progress = Math.max(
        0,
        Math.min(100, employee.progress ?? 0)
      );

      return {
        id: employee.id,
        name: employee.name,
        role: employee.role,
        status: this.formatStatus(employee.status),

        task:
          employee.currentActivity ??
          employee.currentTask ??
          employee.lastCompletedTask ??
          "Waiting for the next assignment",

        progress,
        eta: this.getEta(employee.status, progress),
      };
    });
  }

  private formatStatus(status: string): string {
    switch (status) {
      case "working":
        return "Working";

      case "completed":
        return "Completed";

      case "waiting":
        return "Waiting";

      case "error":
        return "Error";

      case "idle":
      default:
        return "Idle";
    }
  }

  private getEta(
    status: string,
    progress: number
  ): string {
    if (status === "completed" || progress >= 100) {
      return "Done";
    }

    if (status === "idle") {
      return "--";
    }

    if (status === "waiting") {
      return "Approval";
    }

    const remainingProgress = 100 - progress;
    const estimatedMinutes = Math.max(
      1,
      Math.ceil(remainingProgress / 20)
    );

    return `${estimatedMinutes} min`;
  }
}

export const workforceReadService =
  new WorkforceReadService();