import { businessEngine } from "./BusinessEngine";
import { businessStateService } from "./BusinessStateService";
import { workforceService } from "@/services/employees/WorkforceService";

export type BusinessCycleCallbacks = {
  onRefresh: () => void;
  onCompleted: (result: ReturnType<typeof businessEngine.startBusinessDay>) => void;
};

class BusinessCycleRunner {
  run(callbacks: BusinessCycleCallbacks) {
    const employees = workforceService.getAll();

    businessStateService.setState("running");
    workforceService.resetWorkforce();

    callbacks.onRefresh();

    employees.forEach((employee, index) => {
      window.setTimeout(() => {
        workforceService.updateStatus(
          employee.id,
          "working"
        );

        callbacks.onRefresh();
      }, 400 * (index + 1));
    });

    const delay =
      400 * (employees.length + 1) + 700;

    window.setTimeout(() => {
      const result = businessEngine.startBusinessDay();

      callbacks.onCompleted(result);
      callbacks.onRefresh();
    }, delay);
  }
}

export const businessCycleRunner =
  new BusinessCycleRunner();