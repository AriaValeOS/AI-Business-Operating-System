"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { initializeBusinessSystem } from "@/services/bootstrap/initializeBusinessSystem";
import { businessCycleRunner } from "@/services/business/BusinessCycleRunner";
import { dashboardReadService } from "@/services/dashboard/DashboardReadService";
import type { DashboardViewModel } from "@/types/dashboard";

import ActivityCard from "./cards/ActivityCard";
import AIWorkforceWidget from "./cards/AIWorkforceWidget";
import AssistantCard from "./cards/AssistantCard";
import BusinessHealthWidget from "./cards/BusinessHealthWidget";
import ConsoleCard from "./cards/ConsoleCard";
import ExecutiveBriefingWidget from "./cards/ExecutiveBriefingWidget";
import FounderInboxWidget from "./cards/FounderInboxWidget";
import MissionControlWidget from "./cards/ProjectCard";

export default function CommandCenter() {
  const [dashboard, setDashboard] =
    useState<DashboardViewModel | null>(null);

  const [activities, setActivities] =
    useState<string[]>([]);

  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const [isCompleted, setIsCompleted] =
    useState(false);

  const loadDashboard = useCallback(async () => {
    const dashboardData =
      await dashboardReadService.getDashboard();

    setDashboard(dashboardData);

    const formattedActivities =
      dashboardData.activities.map((activity) => {
        const time = new Date(
          activity.timestamp,
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return `${time} • ${activity.title}`;
      });

    setActivities(formattedActivities);
  }, []);

  useEffect(() => {
    initializeBusinessSystem();
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadDashboard]);

  const refreshDashboard = useCallback(() => {
    void loadDashboard();
  }, [loadDashboard]);

  function handleSessionComplete() {
    if (isRunning) {
      return;
    }

    setIsCompleted(false);
    setIsRunning(true);

    businessCycleRunner.run({
      onRefresh: refreshDashboard,

      onCompleted: (result) => {
        setLogs(result.logs);
        setIsRunning(false);
        setIsCompleted(true);

        refreshDashboard();
      },
    });
  }

  return (
    <div className="space-y-6">
      {dashboard && (
        <ExecutiveBriefingWidget
          data={dashboard.executiveBriefing}
          onStartBusinessDay={
            handleSessionComplete
          }
          isRunning={isRunning}
          isCompleted={isCompleted}
        />
      )}

      <DashboardStats />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          {dashboard ? (
            <MissionControlWidget
              goal={dashboard.goal}
            />
          ) : (
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 text-sm text-zinc-500">
              Mission data will appear after the
              dashboard refreshes.
            </div>
          )}
        </div>

        <div className="xl:col-span-5">
          {dashboard && (
            <BusinessHealthWidget
              goal={dashboard.goal}
              health={dashboard.businessHealth}
            />
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-5">
          {dashboard && (
            <FounderInboxWidget
              items={dashboard.inbox}
            />
          )}
        </div>

        <div className="xl:col-span-7">
          <AIWorkforceWidget
            employees={
              dashboard?.workforce ?? []
            }
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ActivityCard items={activities} />
        </div>

        <div className="xl:col-span-5">
          <ConsoleCard logs={logs} />
        </div>
      </section>

      <AssistantCard
        onSessionComplete={
          handleSessionComplete
        }
      />
    </div>
  );
}