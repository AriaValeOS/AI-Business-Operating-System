type WidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Widget({
  title,
  children,
  className = "",
}: WidgetProps) {
  return (
    <section
      className={`rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-sm transition-all duration-300 hover:border-zinc-700 ${className}`}
    >
      <h2 className="mb-5 text-lg font-semibold tracking-tight text-white">
        {title}
      </h2>

      {children}
    </section>
  );
}