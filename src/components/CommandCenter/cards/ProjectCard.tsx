import Card from "@/components/ui/Card";
import { workforceService } from "@/services/employees/WorkforceService";

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

            <p className="text-sm text-zinc-500">
              Status: {employee.status}
            </p>

            <p className="text-sm text-zinc-600">
              Model: {employee.aiModel}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}