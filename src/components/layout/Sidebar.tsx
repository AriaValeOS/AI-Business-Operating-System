"use client";

import {
  BarChart3,
  Brain,
  CalendarDays,
  CheckSquare,
  CircleUserRound,
  Command,
  Database,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

type NavigationItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
};

const primaryNavigation: NavigationItem[] = [
  {
    label: "Command Center",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Brain",
    icon: Brain,
  },
  {
    label: "Workforce",
    icon: Users,
  },
  {
    label: "Goals",
    icon: Sparkles,
  },
  {
    label: "Tasks",
    icon: CheckSquare,
  },
  {
    label: "Analytics",
    icon: BarChart3,
  },
];

const businessNavigation: NavigationItem[] = [
  {
    label: "Marketing",
    icon: Megaphone,
  },
  {
    label: "Store",
    icon: ShoppingBag,
  },
  {
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    label: "Knowledge",
    icon: Database,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/5 bg-[#080d18] px-5 py-6">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
          <Command className="h-6 w-6 text-white" />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight text-white">
            AI Business OS
          </h2>

          <p className="mt-1 text-xs leading-5 text-zinc-500">
            The Operating System
            <br />
            for Digital Companies
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

        <span className="text-xs font-medium text-zinc-400">
          System Healthy
        </span>
      </div>

      <nav className="mt-8 flex-1 overflow-y-auto pr-1">
        <div className="space-y-1">
          {primaryNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] shrink-0 ${
                    item.active
                      ? "text-white"
                      : "text-zinc-500 transition-colors group-hover:text-zinc-200"
                  }`}
                />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <p className="mb-2 mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
          Business
        </p>

        <div className="space-y-1">
          {businessNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
              >
                <Icon className="h-[18px] w-[18px] shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-200" />

                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="mt-6 border-t border-white/5 pt-5">
        <button
          type="button"
          className="group mb-3 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
        >
          <Settings className="h-[18px] w-[18px] text-zinc-500 transition-colors group-hover:text-zinc-200" />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.025] p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800">
            <CircleUserRound className="h-5 w-5 text-zinc-300" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Mārtiņš K.
            </p>

            <p className="mt-0.5 text-xs text-zinc-500">
              Founder & CEO
            </p>
          </div>

          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </aside>
  );
}