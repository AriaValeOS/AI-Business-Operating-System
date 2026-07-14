import AnimatedNumber from "@/components/ui/AnimatedNumber";
import { dashboardDensity } from "@/styles/designTokens";

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
      className={`
        ${dashboardDensity.cardRadius}
        ${dashboardDensity.cardPadding}
        ${dashboardDensity.compactCardMinHeight}
        border bg-white/[0.025]
        shadow-[0_16px_40px_rgba(0,0,0,0.14)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.035]
        ${styles.border}
      `}
    >
      <div className="flex h-full items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500">
            {title}
          </p>

          <h2
            className={`mt-2 text-2xl font-bold tracking-tight ${styles.value}`}
          >
            {typeof value === "number" ? (
              <AnimatedNumber value={value} />
            ) : (
              value
            )}
          </h2>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <div className="[&>svg]:h-5 [&>svg]:w-5">
            {icon}
          </div>
        </div>
      </div>
    </section>
  );
}