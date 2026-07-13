import { EmployeeStatus } from "@/types/employee";

type StatusBadgeProps = {
  status: EmployeeStatus;
};

const config: Record<
  EmployeeStatus,
  {
    label: string;
    dot: string;
    badge: string;
    pulse: boolean;
  }
> = {
  working: {
    label: "Working",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    pulse: true,
  },

  idle: {
    label: "Idle",
    dot: "bg-zinc-400",
    badge: "bg-zinc-800 text-zinc-300 border border-zinc-700",
    pulse: false,
  },

  completed: {
    label: "Completed",
    dot: "bg-blue-400",
    badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",
    pulse: false,
  },

  offline: {
    label: "Offline",
    dot: "bg-red-400",
    badge: "bg-red-500/10 text-red-300 border border-red-500/20",
    pulse: false,
  },

  "waiting-for-approval": {
    label: "Waiting",
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    pulse: false,
  },
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const item = config[status];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${item.badge}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          item.dot
        } ${item.pulse ? "animate-pulse" : ""}`}
      />

      {item.label}
    </span>
  );
}