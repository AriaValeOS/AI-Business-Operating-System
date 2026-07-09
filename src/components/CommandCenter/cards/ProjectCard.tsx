import Card from "@/components/ui/Card";
import { workforceService } from "@/services/employees/WorkforceService";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ProjectCard() {
  const employees = workforceService.getAll();

  return (
    <Card title="👥 AI Workforce">
      <div className="space-y-4">
        {employees.map((employee) => (
          <div key={employee.id}>
            <p className="font-semibold">{employee.name}</p>

            <p className="text-sm text-zinc-400">
              {employee.role}
            </p>

            <p className="text-sm text-zinc-500">
              Department: {employee.department}
            </p>

            <div className="mt-2">
  <StatusBadge status={employee.status} />
</div>

            <p className="text-sm text-zinc-600">
              Model: {employee.aiModel}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}