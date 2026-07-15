import {
  Bot,
  BriefcaseBusiness,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

import { workforceService } from "@/services/employees/WorkforceService";

export default function ProjectCard() {
  const employees = workforceService.getAll();

  return (
    <Card title="AI Workforce">
      <div className="space-y-3">
        {employees.map((employee) => {
          const progress = employee.progress ?? 0;

          return (
            <div
              key={employee.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.035]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {employee.name}
                      </h3>

                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        {employee.role}
                      </p>
                    </div>

                    <StatusBadge status={employee.status} />
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1.5 capitalize">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      {employee.department}
                    </span>

                    <span className="truncate">
                      Task:{" "}
                      <span className="text-zinc-300">
                        {employee.currentTask ?? "No active task"}
                      </span>
                    </span>

                    <span className="rounded-md border border-white/5 bg-white/[0.025] px-2 py-1 text-[11px] text-zinc-400">
                      {employee.aiModel}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Progress
                      </span>

                      <span className="font-medium text-white">
                        {progress}%
                      </span>
                    </div>

                    <ProgressBar value={progress} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}