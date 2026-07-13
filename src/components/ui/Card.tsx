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
      className={`rounded-3xl border border-white/5 bg-white/[0.025] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-white/10 hover:bg-white/[0.035] ${className}`}
    >
      <div className="mb-5 flex items-center justify-between">
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