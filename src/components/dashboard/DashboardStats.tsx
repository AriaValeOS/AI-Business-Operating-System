import {
  Activity,
  Bot,
  CheckCircle2,
  Target,
} from "lucide-react";

import KpiWidget from "./KpiWidget";
import { dashboardService } from "@/services/dashboard/DashboardService";
export default function DashboardStats() {
  const stats = dashboardService.getStats();

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
      <KpiWidget
        title="Active Goals"
        value={stats.activeGoals}
        subtitle="1 high-priority goal"
        icon={<Target className="h-6 w-6" />}
      />

      <KpiWidget
        title="AI Workforce"
        value={stats.workforce}
        subtitle="3 employees available"
        icon={<Bot className="h-6 w-6" />}
      />

      <KpiWidget
        title="Active Tasks"
        value={stats.activeTasks}
        subtitle="Ready for execution"
        icon={<CheckCircle2 className="h-6 w-6" />}
      />

      <KpiWidget
        title="Business Health"
        value={stats.businessHealth}
        subtitle="All systems operational"
        icon={<Activity className="h-6 w-6" />}
      />
    </section>
  );
}