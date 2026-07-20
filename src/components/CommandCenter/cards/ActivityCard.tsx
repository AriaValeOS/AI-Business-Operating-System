import {
  Activity,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import Card from "@/components/ui/Card";

type ActivityCardProps = {
  items: string[];
};

export default function ActivityCard({
  items,
}: ActivityCardProps) {
  return (
    <Card title="🕒 Business Timeline">
      <p className="mb-5 text-sm text-zinc-400">
        Recent activity across your AI workforce.
      </p>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center">
            <Activity className="mx-auto mb-2 h-6 w-6 text-zinc-500" />

            <p className="text-sm text-zinc-400">
              No business activity yet.
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-3 transition hover:border-blue-500/20"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="mt-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm text-white">
                      {item}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      Recorded by Business Engine
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <Clock3 className="h-3 w-3" />
                  Recent
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}