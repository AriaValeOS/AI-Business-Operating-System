import Card from "@/components/ui/Card";

type ActivityCardProps = {
  items: string[];
};

export default function ActivityCard({ items }: ActivityCardProps) {
  return (
    <Card title="📡 Activity Feed">
      {items.length === 0 ? (
        <p className="text-zinc-500">No activity yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <p key={index}>✓ {item}</p>
          ))}
        </div>
      )}
    </Card>
  );
}