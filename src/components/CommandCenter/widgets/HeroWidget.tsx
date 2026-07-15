import {
  CheckCircle2,
  LoaderCircle,
  Play,
} from "lucide-react";

import InfoRow from "@/components/ui/InfoRow";
import ProgressBar from "@/components/ui/ProgressBar";

import { dashboardDensity } from "@/styles/designTokens";

import { businessStateService } from "@/services/business/BusinessStateService";
import { morningBriefingService } from "@/services/business/MorningBriefingService";
import { recommendationService } from "@/services/business/RecommendationService";
import { dashboardService } from "@/services/dashboard/DashboardService";
import { goalService } from "@/services/goals/GoalService";

type HeroWidgetProps = {
  onStartBusinessDay: () => void;
  isRunning: boolean;
  isCompleted: boolean;
};

export default function HeroWidget({
  onStartBusinessDay,
  isRunning,
  isCompleted,
}: HeroWidgetProps) {
  const goal = goalService.getActiveGoal();
  const briefing = morningBriefingService.getBriefing();
  const stats = dashboardService.getStats();
  const recommendation = recommendationService.getRecommendation();

  const storedBusinessState = businessStateService.getState();

  const businessState = isRunning
    ? "running"
    : isCompleted
      ? "completed"
      : storedBusinessState;

  const progress =
    goal.kpi.target > 0
      ? Math.round(
          (goal.kpi.current / goal.kpi.target) * 100
        )
      : 0;

  const businessStateConfig = {
    idle: {
      label: "Business Idle",
      dot: "bg-zinc-400",
      badge:
        "border-white/10 bg-white/[0.04] text-zinc-300",
    },
    running: {
      label: "Business Running",
      dot: "bg-emerald-400 animate-pulse",
      badge:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    },
    completed: {
      label: "Business Day Completed",
      dot: "bg-blue-400",
      badge:
        "border-blue-500/20 bg-blue-500/10 text-blue-300",
    },
  } as const;

  const currentState = businessStateConfig[businessState];

  return (
    <section
      className={`
        ${dashboardDensity.cardRadius}
        border border-white/5
        bg-white/[0.03]
        px-5 py-4
        shadow-[0_16px_44px_rgba(0,0,0,0.14)]
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-medium text-blue-400">
              {briefing.greeting}
            </p>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${currentState.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${currentState.dot}`}
              />

              {currentState.label}
            </span>
          </div>

          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
            {briefing.title}
          </h2>

          <p className="mt-1.5 max-w-2xl text-xs leading-5 text-zinc-400">
            {briefing.summary}
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                briefing.businessHealth === "Healthy"
                  ? "bg-emerald-400"
                  : briefing.businessHealth === "Warning"
                    ? "bg-amber-400"
                    : "bg-red-400"
              }`}
            />

            <span className="text-[11px] text-zinc-400">
              Business Health: {briefing.businessHealth}
            </span>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-300">
          {briefing.priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-500">
            Department
          </p>

          <p className="mt-0.5 text-sm font-semibold capitalize text-white">
            {goal.department}
          </p>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-500">
            Owner
          </p>

          <p className="mt-0.5 text-sm font-semibold text-white">
            Aria
          </p>
        </div>

        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-zinc-500">
            Progress
          </p>

          <p className="mt-0.5 text-sm font-semibold text-white">
            {progress}%
          </p>
        </div>
      </div>

      <div className="mt-2">
        <ProgressBar value={progress} />
      </div>

      {isCompleted && (
        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Today&apos;s business cycle completed successfully.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
        <div className="rounded-xl border border-white/5 bg-white/[0.015] px-3 py-1">
          <InfoRow
            label="AI Employees Ready"
            value={stats.workforce}
          />

          <InfoRow
            label="Active Tasks"
            value={stats.activeTasks}
          />

          <InfoRow
            label="Business Health"
            value={stats.businessHealth}
          />
        </div>

        <div className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300">
            AI Recommendation
          </p>

          <h3 className="mt-1 text-xs font-semibold text-white">
            {recommendation.title}
          </h3>

          <p className="mt-1 text-[11px] leading-4 text-zinc-300">
            {recommendation.message}
          </p>

          {recommendation.action && (
            <p className="mt-1.5 text-[11px] font-medium text-blue-300">
              Recommended action: {recommendation.action}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onStartBusinessDay}
        disabled={isRunning}
        className={`mt-4 inline-flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-semibold text-white shadow-lg transition-all duration-200 ${
          isRunning
            ? "cursor-not-allowed bg-zinc-700 shadow-none"
            : isCompleted
              ? "bg-emerald-600 shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-500"
              : "bg-blue-600 shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500"
        }`}
      >
        {isRunning ? (
          <>
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
            Working...
          </>
        ) : isCompleted ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            Business Day Completed
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 fill-current" />
            Start Business Day
          </>
        )}
      </button>
    </section>
  );
}