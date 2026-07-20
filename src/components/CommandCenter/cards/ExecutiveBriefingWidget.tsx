import {
  Activity,
  BriefcaseBusiness,
  CheckCircle2,
  LoaderCircle,
  Play,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import ProgressBar from "@/components/ui/ProgressBar";

import { dashboardDensity } from "@/styles/designTokens";

import { businessStateService } from "@/services/business/BusinessStateService";
import { morningBriefingService } from "@/services/business/MorningBriefingService";
import { recommendationService } from "@/services/business/RecommendationService";
import { dashboardService } from "@/services/dashboard/DashboardService";
import { goalService } from "@/services/goals/GoalService";

type ExecutiveBriefingWidgetProps = {
  onStartBusinessDay: () => void;
  isRunning: boolean;
  isCompleted: boolean;
};

type BusinessState = "idle" | "running" | "completed";

const businessStateConfig = {
  idle: {
    label: "Business Idle",
    dot: "bg-zinc-400",
    badge: "border-white/10 bg-white/[0.04] text-zinc-300",
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
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  },
} as const;

export default function ExecutiveBriefingWidget({
  onStartBusinessDay,
  isRunning,
  isCompleted,
}: ExecutiveBriefingWidgetProps) {
  const goal = goalService.getActiveGoal();
  const briefing = morningBriefingService.getBriefing();
  const stats = dashboardService.getStats();
  const recommendation = recommendationService.getRecommendation();

  const storedBusinessState =
    businessStateService.getState() as BusinessState;

  const businessState: BusinessState = isRunning
    ? "running"
    : isCompleted
      ? "completed"
      : storedBusinessState;

  const currentState = businessStateConfig[businessState];

  const progress =
    goal.kpi.target > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              (goal.kpi.current / goal.kpi.target) * 100,
            ),
          ),
        )
      : 0;

  const healthStyles =
    briefing.businessHealth === "Healthy"
      ? {
          dot: "bg-emerald-400",
          text: "text-emerald-300",
          background:
            "border-emerald-500/15 bg-emerald-500/[0.06]",
        }
      : briefing.businessHealth === "Warning"
        ? {
            dot: "bg-amber-400",
            text: "text-amber-300",
            background:
              "border-amber-500/15 bg-amber-500/[0.06]",
          }
        : {
            dot: "bg-red-400",
            text: "text-red-300",
            background:
              "border-red-500/15 bg-red-500/[0.06]",
          };

  return (
    <section
      className={`
        ${dashboardDensity.cardRadius}
        relative overflow-hidden
        border border-white/5
        bg-white/[0.03]
        px-5 py-5
        shadow-[0_16px_44px_rgba(0,0,0,0.14)]
      `}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Executive Briefing
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${currentState.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${currentState.dot}`}
              />

              {currentState.label}
            </span>
          </div>

          <p className="mt-3 text-xs font-medium text-zinc-400">
            {briefing.greeting}
          </p>

          <h2 className="mt-1 max-w-3xl text-2xl font-bold tracking-tight text-white">
            {briefing.title}
          </h2>

          <p className="mt-2 max-w-3xl text-xs leading-5 text-zinc-400">
            {briefing.summary}
          </p>
        </div>

        <span className="shrink-0 self-start rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-red-300">
          {briefing.priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <div className="rounded-xl border border-white/5 bg-black/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Business Health
            </span>

            <Activity className="h-3.5 w-3.5 text-zinc-500" />
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${healthStyles.dot}`}
            />

            <span
              className={`text-sm font-semibold ${healthStyles.text}`}
            >
              {briefing.businessHealth}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              AI Workforce
            </span>

            <Users className="h-3.5 w-3.5 text-zinc-500" />
          </div>

          <p className="mt-2 text-lg font-bold text-white">
            {stats.workforce}
          </p>

          <p className="mt-0.5 text-[10px] text-zinc-500">
            Employees ready
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Active Tasks
            </span>

            <BriefcaseBusiness className="h-3.5 w-3.5 text-zinc-500" />
          </div>

          <p className="mt-2 text-lg font-bold text-white">
            {stats.activeTasks}
          </p>

          <p className="mt-0.5 text-[10px] text-zinc-500">
            Currently in progress
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-black/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Goal Progress
            </span>

            <Target className="h-3.5 w-3.5 text-zinc-500" />
          </div>

          <p className="mt-2 text-lg font-bold text-white">
            {progress}%
          </p>

          <p className="mt-0.5 truncate text-[10px] capitalize text-zinc-500">
            {goal.department} department
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.015] p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
              Today&apos;s Focus
            </p>

            <p className="mt-1 text-sm font-semibold capitalize text-white">
              {goal.department}
            </p>
          </div>

          <span className="text-sm font-semibold text-white">
            {progress}%
          </span>
        </div>

        <div className="mt-3">
          <ProgressBar value={progress} />
        </div>

        <div className="mt-2 flex justify-between text-[10px] text-zinc-500">
          <span>
            Current: {goal.kpi.current}
          </span>

          <span>
            Target: {goal.kpi.target}
          </span>
        </div>
      </div>

      <div
        className={`mt-4 rounded-xl border p-4 ${healthStyles.background}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
            <Sparkles className="h-4 w-4 text-blue-300" />
          </div>

          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300">
              Today&apos;s AI Recommendation
            </p>

            <h3 className="mt-1 text-sm font-semibold text-white">
              {recommendation.title}
            </h3>

            <p className="mt-1 text-[11px] leading-5 text-zinc-300">
              {recommendation.message}
            </p>

            {recommendation.action && (
              <p className="mt-2 text-[11px] font-medium text-blue-300">
                Recommended action: {recommendation.action}
              </p>
            )}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-2 text-[11px] text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />

          Today&apos;s business cycle completed successfully.
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onStartBusinessDay}
          disabled={isRunning || isCompleted}
          className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-xs font-semibold text-white shadow-lg transition-all duration-200 ${
            isRunning
              ? "cursor-not-allowed bg-zinc-700 shadow-none"
              : isCompleted
                ? "cursor-default bg-emerald-600 shadow-emerald-600/20"
                : "bg-blue-600 shadow-blue-600/20 hover:-translate-y-0.5 hover:bg-blue-500"
          }`}
        >
          {isRunning ? (
            <>
              <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
              Running Business Cycle
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

        <p className="text-[10px] leading-4 text-zinc-500">
          AI employees will analyze priorities and execute the next
          business cycle.
        </p>
      </div>
    </section>
  );
}