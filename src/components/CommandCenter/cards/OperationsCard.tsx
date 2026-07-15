import Card from "@/components/ui/Card";

type OperationsCardProps = {
  queueCount: number;
  brainStatus: {
    status: string;
    message: string;
  };
};

export default function OperationsCard({
  queueCount,
  brainStatus,
}: OperationsCardProps) {
  return (
    <Card title="AI Operations">
      <div className="space-y-4">

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Queue
          </p>

          <p className="mt-1 text-2xl font-semibold text-white">
            {queueCount}
          </p>

          <p className="text-xs text-zinc-400">
            Ready items
          </p>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Brain
          </p>

          <p className="mt-1 font-semibold text-white">
            {brainStatus.status}
          </p>

          <p className="mt-1 text-xs text-zinc-400">
            {brainStatus.message}
          </p>
        </div>

      </div>
    </Card>
  );
}