import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { aiSession } from "@/services/session/AISession";

type AssistantCardProps = {
  onSessionComplete: (queueCount: number) => void;
};

export default function AssistantCard({ onSessionComplete }: AssistantCardProps) {
  function startSession() {
    const result = aiSession.run();
    onSessionComplete(result.queueCount);
  }

  return (
    <Card title="🤖 AI Assistant">
      <Button onClick={startSession}>
        ✨ Start AI Session
      </Button>
    </Card>
  );
}