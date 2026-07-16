import {
  Activity,
  Brain,
  Clock3,
  ListTodo,
  Zap,
} from "lucide-react";

import Card from "@/components/ui/Card";

type OperationsCardProps = {
  queueCount: number;
  brainStatus: {
    status: string;
    message: string;
  };
};

export default function OperationsCard({
  queueCount,
  brainStatus,
}: OperationsCardProps) {
  const nextAction =
    queueCount > 0
      ? "Process queued tasks"
      : "Start Business Day";

  const lastCycle =
    brainStatus.status === "completed"
      ? "Completed"
      : "Waiting";

  return (
    <Card title="AI Operations">
      <div className="space-y-3">

        <OperationRow
          icon={<ListTodo className="h-4 w-4" />}
          label="Queue"
          value={`${queueCount} Ready`}
        />

        <OperationRow
          icon={<Brain className="h-4 w-4" />}
          label="Brain"
          value={brainStatus.status}
        />

        <OperationRow
          icon={<Zap className="h-4 w-4" />}
          label="Next Action"
          value={nextAction}
        />

        <OperationRow
          icon={<Clock3 className="h-4 w-4" />}
          label="Last Cycle"
          value={lastCycle}
        />

        <OperationRow
          icon={<Activity className="h-4 w-4" />}
          label="Running Jobs"
          value="0"
        />

        <div className="rounded-xl border border-blue-500/15 bg-blue-500/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-blue-300">
            Brain Message
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-300">
            {brainStatus.message}
          </p>
        </div>

      </div>
    </Card>
  );
}

type OperationRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function OperationRow({
  icon,
  label,
  value,
}: OperationRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2">
      <div className="flex items-center gap-2 text-zinc-400">
        {icon}

        <span className="text-xs">
          {label}
        </span>
      </div>

      <span className="text-xs font-medium text-white">
        {value}
      </span>
    </div>
  );
}