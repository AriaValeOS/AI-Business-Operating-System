import Card from "@/components/ui/Card";
import { appConfig } from "@/config/app";

export default function ProjectCard() {
  return (
    <Card title="🟢 Active Project">
      <p>{appConfig.project}</p>
      <p className="text-zinc-400 text-sm mt-2">Status: Online</p>
    </Card>
  );
}