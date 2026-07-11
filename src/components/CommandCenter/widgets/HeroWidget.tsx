import ProgressBar from "@/components/ui/ProgressBar";
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

const progress = Math.round(
  (goal.kpi.current / goal.kpi.target) * 100
);
  return (
    <section className="rounded-3xl border border-white/5 bg-white/[0.03] p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-blue-400">
            Today&apos;s Focus
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {goal.title}
          </h2>

          <p className="mt-3 max-w-xl text-zinc-400">
  Your AI Workforce is currently preparing today&apos;s marketing
  campaign. Review the plan and start the business day when ready.
</p>
        </div>

        <span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-300">
          {goal.priority.toUpperCase()} PRIORITY
        </span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Department
          </p>

          <p className="mt-2 text-lg font-semibold">
            {goal.department}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Owner
          </p>

          <p className="mt-2 text-lg font-semibold">
            Aria
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Progress
          </p>

          <p className="mt-2 text-lg font-semibold">
           {progress}%
          </p>
        </div>
      </div>

      <div className="mt-5">
        <ProgressBar value={progress} />
      </div>
{isCompleted && (
  <p className="mt-4 text-sm text-emerald-400">
  ✔ Today&apos;s business cycle completed successfully.
</p>
)}
      <button
  onClick={onStartBusinessDay}
  disabled={isRunning}
  className={`mt-8 rounded-2xl px-6 py-3 font-semibold text-white transition ${
    isRunning
      ? "cursor-not-allowed bg-zinc-700"
      : isCompleted
      ? "bg-emerald-600 hover:bg-emerald-500"
      : "bg-blue-600 hover:bg-blue-500"
  }`}
>
  {isRunning
    ? "⏳ Working..."
    : isCompleted
    ? "✔ Business Day Completed"
    : "▶ Start Business Day"}
</button>
    </section>
  );
}