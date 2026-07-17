import Card from "@/components/ui/Card";

type ActivityCardProps = {
  items: string[];
};

export default function ActivityCard({
  items,
}: ActivityCardProps) {
  return (
    <Card title="📡 Activity Feed">
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No activity yet.
          </p>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-start gap-2 text-sm"
            >
              <span className="mt-0.5 text-emerald-500">
                ●
              </span>

              <span className="text-zinc-300">
                {item}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}