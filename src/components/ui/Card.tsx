type CardProps = {
  title: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900 p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-zinc-200">{children}</div>
    </div>
  );
}