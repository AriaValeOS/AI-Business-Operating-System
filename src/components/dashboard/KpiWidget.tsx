import AnimatedNumber from "@/components/ui/AnimatedNumber";
type KpiTone = "default" | "success" | "warning" | "danger";

type KpiWidgetProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  tone?: KpiTone;
};

const toneStyles: Record<
  KpiTone,
  {
    value: string;
    icon: string;
    border: string;
  }
> = {
  default: {
    value: "text-white",
    icon: "bg-blue-500/10 text-blue-300",
    border: "border-white/5",
  },
  success: {
    value: "text-emerald-300",
    icon: "bg-emerald-500/10 text-emerald-300",
    border: "border-emerald-500/15",
  },
  warning: {
    value: "text-amber-300",
    icon: "bg-amber-500/10 text-amber-300",
    border: "border-amber-500/15",
  },
  danger: {
    value: "text-red-300",
    icon: "bg-red-500/10 text-red-300",
    border: "border-red-500/15",
  },
};

export default function KpiWidget({
  title,
  value,
  subtitle,
  icon,
  tone = "default",
}: KpiWidgetProps) {
  const styles = toneStyles[tone];

  return (
    <section
      className={`rounded-3xl border bg-white/[0.025] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)] transition-all duration-300 hover:bg-white/[0.035] ${styles.border}`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-500">
            {title}
          </p>

          <h2 className={`mt-3 text-3xl font-bold tracking-tight ${styles.value}`}>
            {typeof value === "number" ? (
  <AnimatedNumber value={value} />
) : (
  value
)}
          </h2>

          <p className="mt-3 text-sm leading-5 text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
        >
          {icon}
        </div>
      </div>
    </section>
  );
}