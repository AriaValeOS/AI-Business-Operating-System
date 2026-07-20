"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { activityReadService } from "@/services/activity/ActivityReadService";
import { initializeBusinessSystem } from "@/services/bootstrap/initializeBusinessSystem";
import { businessCycleRunner } from "@/services/business/BusinessCycleRunner";

import ActivityCard from "./cards/ActivityCard";
import AIWorkforceWidget from "./cards/AIWorkforceWidget";
import AssistantCard from "./cards/AssistantCard";
import BusinessHealthWidget from "./cards/BusinessHealthWidget";
import ConsoleCard from "./cards/ConsoleCard";
import ExecutiveBriefingWidget from "./cards/ExecutiveBriefingWidget";
import FounderInboxWidget from "./cards/FounderInboxWidget";
import MissionControlWidget from "./cards/ProjectCard";

export default function CommandCenter() {
  const [activities, setActivities] = useState<
    string[]
  >([]);

  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] =
    useState(false);

  const [, setDashboardVersion] = useState(0);

  useEffect(() => {
    initializeBusinessSystem();
  }, []);

  const loadActivities = useCallback(async () => {
    const activityItems =
      await activityReadService.getLatest(20);

    const formattedActivities = activityItems.map(
      (activity) => {
        const time = new Date(
          activity.timestamp
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        return `${time} • ${activity.title}`;
      }
    );

    setActivities(formattedActivities);
  }, []);



  const refreshDashboard = useCallback(() => {
    setDashboardVersion(
      (version) => version + 1
    );

    void loadActivities();
  }, [loadActivities]);

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
      <ExecutiveBriefingWidget
        onStartBusinessDay={
          handleSessionComplete
        }
        isRunning={isRunning}
        isCompleted={isCompleted}
      />

      <DashboardStats />

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <MissionControlWidget />
        </div>

        <div className="xl:col-span-5">
          <BusinessHealthWidget />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <FounderInboxWidget />
        </div>

        <div className="xl:col-span-7">
          <AIWorkforceWidget />
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