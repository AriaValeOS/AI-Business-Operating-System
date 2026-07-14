import { dashboardDensity } from "@/styles/designTokens";

type CardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`
        ${dashboardDensity.cardRadius}
        ${dashboardDensity.cardPadding}
        border border-white/5
        bg-white/[0.025]
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
        transition-all duration-300
        hover:border-white/10
        hover:bg-white/[0.035]
        hover:-translate-y-0.5
        ${className}
      `}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="text-zinc-200">
        {children}
      </div>
    </section>
  );
}