import { EmployeeStatus } from "@/types/employee";

type StatusBadgeProps = {
  status: EmployeeStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<EmployeeStatus, string> = {
    working: "bg-green-500/20 text-green-400",
    idle: "bg-zinc-700 text-zinc-300",
    offline: "bg-red-500/20 text-red-400",
    "waiting-for-approval": "bg-yellow-500/20 text-yellow-400",
    completed: "bg-emerald-500/20 text-emerald-400",
  };

  const labels: Record<EmployeeStatus, string> = {
    working: "Working",
    idle: "Idle",
    offline: "Offline",
    "waiting-for-approval": "Waiting",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}