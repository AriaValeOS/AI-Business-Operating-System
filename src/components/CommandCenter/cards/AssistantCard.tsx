import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type AssistantCardProps = {
  onStartSession: () => void;
};

export default function AssistantCard({ onStartSession }: AssistantCardProps) {
  return (
    <Card title="🤖 AI Assistant">
      <Button onClick={onStartSession}>
        ✨ Start AI Session
      </Button>
    </Card>
  );
}