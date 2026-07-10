import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#050914] text-white">
      <Sidebar />

      <main className="min-h-screen pl-72">
        <div className="mx-auto w-full max-w-[1600px] px-8 py-8 xl:px-10">
          <TopBar />

          <div className="pt-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}