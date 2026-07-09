import Card from "@/components/ui/Card";
import { goalService } from "@/services/goals/GoalService";
import ProgressBar from "@/components/ui/ProgressBar";

export default function KpiCard() {
  const goal = goalService.getActiveGoal();

  const progress =
    goal.kpi.target === 0
      ? 0
      : Math.round((goal.kpi.current / goal.kpi.target) * 100);

  return (
    <Card title="📈 KPI Progress">
      <p className="font-semibold">{goal.kpi.metric}</p>

      <p className="text-sm text-zinc-400 mt-2">
        {goal.kpi.current} / {goal.kpi.target} {goal.kpi.unit}
      </p>

      <p className="text-sm text-zinc-500 mt-2">
        Progress: {progress}%
      </p>

<ProgressBar value={progress} />
    </Card>
  );
}