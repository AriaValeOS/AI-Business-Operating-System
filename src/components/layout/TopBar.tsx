"use client";

import {
  Bell,
  Brain,
  Search,
  Settings,
  Sparkles,
} from "lucide-react";

import { appConfig } from "@/config/app";

export default function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-white/5 pb-6">
      <div>
        <p className="text-sm font-medium text-blue-400">
          Command Center
        </p>

        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
          Good evening, {appConfig.founder}
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.025] text-zinc-400 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="AI Brain status"
          className="flex h-11 items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 text-sm font-medium text-blue-300 transition-all duration-200 hover:bg-blue-500/15"
        >
          <Brain className="h-4 w-4" />
          Brain Active
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.025] text-zinc-400 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-[#050914]" />
        </button>

        <button
          type="button"
          aria-label="Quick actions"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.025] text-zinc-400 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <Sparkles className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/[0.025] text-zinc-400 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}