import {
  Activity,
  BarChart3,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

import { goalService } from "@/services/goals/GoalService";

export default function BusinessHealthWidget() {
  const goal = goalService.getActiveGoal();

  const progress =
    goal.kpi.target === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (goal.kpi.current / goal.kpi.target) * 100,
          ),
        );

  const score =
    progress >= 90
      ? "Excellent"
      : progress >= 70
        ? "Good"
        : progress >= 50
          ? "Warning"
          : "Critical";

  const scoreColor =
    progress >= 90
      ? "text-emerald-400"
      : progress >= 70
        ? "text-blue-400"
        : progress >= 50
          ? "text-amber-400"
          : "text-red-400";

  return (
    <Card title="📊 Business Health">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">
            Overall Score
          </p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-3xl font-bold text-white">
              {progress}
            </span>

            <span
              className={`mb-1 text-sm font-semibold ${scoreColor}`}
            >
              {score}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={progress} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />

            <span className="text-xs uppercase text-zinc-500">
              KPI
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-white">
            {goal.kpi.metric}
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-400" />

            <span className="text-xs uppercase text-zinc-500">
              Current
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold text-white">
            {goal.kpi.current} / {goal.kpi.target}
          </p>

          <p className="text-xs text-zinc-500">
            {goal.kpi.unit}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] p-3">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
              AI Insight
            </p>

            <p className="mt-1 text-xs leading-5 text-zinc-300">
              Business performance is stable. Continue focusing on{" "}
              <strong>{goal.department}</strong> to reach the next
              milestone.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}