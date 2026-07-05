import Card from "@/components/ui/Card";

type Props = {
  logs: string[];
};

export default function ConsoleCard({ logs }: Props) {
  return (
    <Card title="💻 AI Console">
      <div className="bg-black rounded-lg p-5 font-mono text-green-400 text-sm space-y-2 h-80 overflow-y-auto">
        {logs.map((log, index) => (
          <div key={index}>
            [{new Date().toLocaleTimeString()}] {log}
          </div>
        ))}
      </div>
    </Card>
  );
}