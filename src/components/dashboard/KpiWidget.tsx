type KpiWidgetProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
};

export default function KpiWidget({
  title,
  value,
  subtitle,
  icon,
}: KpiWidgetProps) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
}