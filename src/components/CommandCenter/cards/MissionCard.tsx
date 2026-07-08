import Card from "@/components/ui/Card";
import { goalService } from "@/services/goals/GoalService";

export default function MissionCard() {
  const goal = goalService.getActiveGoal();

  return (
    <Card title="🎯 Active Goal">
      <p className="font-semibold">{goal.title}</p>

      <p className="text-zinc-400 text-sm mt-2">
        Status: {goal.status}
      </p>

      <p className="text-zinc-400 text-sm">
        Department: {goal.department}
      </p>

      <p className="text-zinc-400 text-sm">
        Priority: {goal.priority}
      </p>

      <p className="text-zinc-500 text-sm mt-3">
        KPI: {goal.kpi.current} / {goal.kpi.target} {goal.kpi.unit}
      </p>
    </Card>
  );
}