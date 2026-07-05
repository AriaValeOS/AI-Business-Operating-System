import Sidebar from "@/components/layout/Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}