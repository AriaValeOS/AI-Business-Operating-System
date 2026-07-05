import Card from "@/components/ui/Card";

type BrainCardProps = {
  brainStatus: {
    status: string;
    message: string;
    provider: string;
  };
};

export default function BrainCard({ brainStatus }: BrainCardProps) {
  return (
    <Card title="🧠 Aria Brain">

      <p className="font-semibold">
        {brainStatus.message}
      </p>

      <p className="text-zinc-500 text-sm mt-2">
        Provider: {brainStatus.provider}
      </p>

      <p className="text-zinc-600 text-xs mt-3">
        Status: {brainStatus.status}
      </p>

    </Card>
  );
}