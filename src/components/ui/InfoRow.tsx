type InfoRowProps = {
  label: string;
  value: string | number;
};

export default function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3 last:border-b-0">
      <span className="text-sm text-zinc-400">
        {label}
      </span>

      <span className="font-medium text-white">
        {value}
      </span>
    </div>
  );
}