import {
  Brain,
  CheckCircle2,
  Clock3,
  PauseCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import { workforceReadService } from "@/services/employees/WorkforceReadService";

function getStatusDot(status: string): string {
  switch (status) {
    case "Working":
      return "bg-emerald-400 animate-pulse";

    case "Completed":
      return "bg-blue-400";

    case "Waiting":
      return "bg-amber-400";

    case "Error":
      return "bg-red-400";

    default:
      return "bg-zinc-500";
  }
}

function getStatusBadge(status: string): string {
  switch (status) {
    case "Working":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";

    case "Completed":
      return "border-blue-500/20 bg-blue-500/10 text-blue-300";

    case "Waiting":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";

    case "Error":
      return "border-red-500/20 bg-red-500/10 text-red-300";

    default:
      return "border-white/10 bg-white/[0.03] text-zinc-400";
  }
}

export default function AIWorkforceWidget() {
  const employees =
    workforceReadService.getDashboardEmployees();

  const workingCount = employees.filter(
    (employee) => employee.status === "Working"
  ).length;

  const waitingCount = employees.filter(
    (employee) => employee.status === "Waiting"
  ).length;

  const completedCount = employees.filter(
    (employee) => employee.status === "Completed"
  ).length;

  return (
    <Card title="🤖 AI Workforce">
      <div className="mb-5 flex items-start justify-between gap-4">
        <p className="text-sm text-zinc-400">
          Live status of your AI business team.
        </p>

        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300">
          {employees.length} employees
        </span>
      </div>

      <div className="space-y-3">
        {employees.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 text-center">
            <UserRound className="mx-auto h-6 w-6 text-zinc-500" />

            <p className="mt-2 text-sm text-zinc-400">
              No AI employees are registered.
            </p>
          </div>
        ) : (
          employees.map((employee) => (
            <div
              key={employee.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-blue-500/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/10 bg-blue-500/10">
                    <UserRound className="h-5 w-5 text-blue-300" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-semibold text-white">
                        {employee.name}
                      </h3>

                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${getStatusDot(
                          employee.status
                        )}`}
                      />
                    </div>

                    <p className="truncate text-xs text-zinc-500">
                      {employee.role}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStatusBadge(
                    employee.status
                  )}`}
                >
                  {employee.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex items-start justify-between gap-4 text-xs">
                  <span className="text-zinc-400">
                    {employee.task}
                  </span>

                  <span className="shrink-0 font-medium text-white">
                    {employee.progress}%
                  </span>
                </div>

                <div className="mt-2">
                  <ProgressBar value={employee.progress} />
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    ETA {employee.eta}
                  </div>

                  <div className="flex items-center gap-1">
                    {employee.status === "Completed" ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : employee.status === "Idle" ? (
                      <PauseCircle className="h-3 w-3" />
                    ) : (
                      <Brain className="h-3 w-3" />
                    )}

                    {employee.status === "Idle"
                      ? "AI Ready"
                      : "AI Active"}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 rounded-xl border border-blue-500/15 bg-blue-500/[0.05] p-3">
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-300">
              Workforce status
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-300">
              {workingCount} working, {waitingCount} waiting
              and {completedCount} completed.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}