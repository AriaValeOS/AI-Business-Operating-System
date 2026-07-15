import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <Sidebar />

      <main className="min-h-screen pl-72">
        <div className="mx-auto w-full max-w-[1650px] px-6 py-5">
          <TopBar />

          <div className="pt-5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}