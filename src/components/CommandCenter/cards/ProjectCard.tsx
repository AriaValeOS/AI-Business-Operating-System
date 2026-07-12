import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

import { workforceService } from "@/services/employees/WorkforceService";

export default function ProjectCard() {
  const employees = workforceService.getAll();

  return (
    <Card title="👥 AI Workforce">
      <div className="space-y-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-white">
                  {employee.name}
                </h3>

                <p className="text-sm text-zinc-400">
                  {employee.role}
                </p>
              </div>

              <StatusBadge status={employee.status} />
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-zinc-500">
                Department:{" "}
                <span className="text-zinc-300">
                  {employee.department}
                </span>
              </p>

              <p className="text-sm text-zinc-500">
                Current Task:{" "}
                <span className="text-zinc-300">
                  {employee.currentTask ?? "No active task"}
                </span>
              </p>

              <p className="text-sm text-zinc-500">
                Model:{" "}
                <span className="text-zinc-300">
                  {employee.aiModel}
                </span>
              </p>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-zinc-400">
                  Progress
                </span>

                <span className="font-medium text-white">
                  {employee.progress ?? 0}%
                </span>
              </div>

              <ProgressBar value={employee.progress ?? 0} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}