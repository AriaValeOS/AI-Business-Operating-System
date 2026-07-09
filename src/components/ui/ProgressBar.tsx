type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const progress = Math.max(0, Math.min(100, value));

  return (
    <div className="mt-3 h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
      <div
        className="h-full rounded-full bg-blue-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}