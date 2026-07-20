import {
  AlertTriangle,
  Flag,
  Target,
  Timer,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";

import { goalService } from "@/services/goals/GoalService";

export default function MissionControlWidget() {
  const goal = goalService.getActiveGoal();

  const progress =
    goal.kpi.target > 0
      ? Math.round((goal.kpi.current / goal.kpi.target) * 100)
      : 0;

  const risk =
    goal.priority === "high"
      ? "Medium"
      : "Low";

  return (
    <Card title="🎯 Mission Control">
      <h2 className="mt-1 text-lg font-bold text-white">
        {goal.title}
      </h2>

      <p className="mt-2 text-sm text-zinc-400">
        Current business objective
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            Progress
          </span>

          <span className="font-semibold text-white">
            {progress}%
          </span>
        </div>

        <ProgressBar value={progress} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Target className="h-4 w-4" />
            <span className="text-xs uppercase">
              Department
            </span>
          </div>

          <p className="mt-2 font-semibold capitalize text-white">
            {goal.department}
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Flag className="h-4 w-4" />
            <span className="text-xs uppercase">
              Priority
            </span>
          </div>

          <p className="mt-2 font-semibold capitalize text-white">
            {goal.priority}
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs uppercase">
              Risk
            </span>
          </div>

          <p className="mt-2 font-semibold text-emerald-400">
            {risk}
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <Timer className="h-4 w-4" />
            <span className="text-xs uppercase">
              KPI
            </span>
          </div>

          <p className="mt-2 font-semibold text-white">
            {goal.kpi.current} / {goal.kpi.target}
          </p>

          <p className="text-xs text-zinc-500">
            {goal.kpi.unit}
          </p>
        </div>
      </div>
    </Card>
  );
}