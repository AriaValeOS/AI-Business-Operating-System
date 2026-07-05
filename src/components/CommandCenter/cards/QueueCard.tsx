import Card from "@/components/ui/Card";

type QueueCardProps = {
  queueCount: number;
};

export default function QueueCard({ queueCount }: QueueCardProps) {
  return (
    <Card title="📦 Content Queue">
      <p>{queueCount} Ready</p>
    </Card>
  );
}