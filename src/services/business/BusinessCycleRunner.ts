import { businessEngine } from "./BusinessEngine";
import { businessStateService } from "./BusinessStateService";

import { employeeRunner } from "@/services/employees/EmployeeRunner";

export type BusinessCycleCallbacks = {
  onRefresh: () => void;
  onCompleted: (
    result: ReturnType<
      typeof businessEngine.startBusinessDay
    >
  ) => void;
};

class BusinessCycleRunner {
  run(callbacks: BusinessCycleCallbacks) {
    businessStateService.setState("running");

    employeeRunner.run(
      callbacks.onRefresh,

      () => {
        window.setTimeout(() => {
          const result =
            businessEngine.startBusinessDay();

          callbacks.onCompleted(result);
          callbacks.onRefresh();
        }, 700);
      }
    );
  }
}

export const businessCycleRunner =
  new BusinessCycleRunner();