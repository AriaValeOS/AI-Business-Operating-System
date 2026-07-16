import {
  Bot,
  BriefcaseBusiness,
  Cpu,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import StatusBadge from "@/components/ui/StatusBadge";

import { workforceService } from "@/services/employees/WorkforceService";

export default function ProjectCard() {
  const employees = workforceService.getAll();

  return (
    <Card title="AI Workforce">
      <div className="space-y-2.5">
        {employees.map((employee) => {
          const progress = employee.progress ?? 0;

          const activity =
            employee.currentActivity ??
            employee.lastCompletedTask ??
            employee.currentTask ??
            "No active task";

          return (
            <div
              key={employee.id}
              className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.035]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-300">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white">
                        {employee.name}
                      </h3>

                      <p className="truncate text-[11px] text-zinc-400">
                        {employee.role}
                      </p>
                    </div>

                    <StatusBadge status={employee.status} />
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
                    <span className="inline-flex items-center gap-1 capitalize">
                      <BriefcaseBusiness className="h-3 w-3" />
                      {employee.department}
                    </span>

                    <span className="text-zinc-600">•</span>

                    <span className="inline-flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      {employee.aiModel}
                    </span>
                  </div>

                  <p
                    className={`mt-2 truncate text-xs ${
                      employee.status === "working"
                        ? "text-blue-300"
                        : employee.status === "completed"
                          ? "text-emerald-300"
                          : "text-zinc-300"
                    }`}
                  >
                    {activity}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar value={progress} />
                    </div>

                    <span className="w-9 text-right text-[11px] font-semibold text-white">
                      {progress}%
                    </span>
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