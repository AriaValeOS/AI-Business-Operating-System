"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { activityReadService } from "@/services/activity/ActivityReadService";
import { brain } from "@/services/brain/Brain";
import { initializeBusinessSystem } from "@/services/bootstrap/initializeBusinessSystem";
import { businessCycleRunner } from "@/services/business/BusinessCycleRunner";

import ActivityCard from "./cards/ActivityCard";
import AssistantCard from "./cards/AssistantCard";
import ConsoleCard from "./cards/ConsoleCard";
import KpiCard from "./cards/KpiCard";
import OperationsCard from "./cards/OperationsCard";
import ProjectCard from "./cards/ProjectCard";
import HeroWidget from "./widgets/HeroWidget";

export default function CommandCenter() {
  const [queueCount, setQueueCount] = useState(0);

  const [brainStatus, setBrainStatus] = useState(
    brain.think()
  );

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
        const status = brain.think();

        setQueueCount(result.queueCount);
        setBrainStatus(status);
        setLogs(result.logs);
        setIsRunning(false);
        setIsCompleted(true);

        refreshDashboard();
      },
    });
  }

  return (
    <div className="space-y-4">
      <HeroWidget
        onStartBusinessDay={
          handleSessionComplete
        }
        isRunning={isRunning}
        isCompleted={isCompleted}
      />

      <DashboardStats />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <ProjectCard />
        </div>

        <div className="xl:col-span-5">
          <OperationsCard
            queueCount={queueCount}
            brainStatus={brainStatus}
          />
        </div>

        <div className="xl:col-span-7">
          <ActivityCard items={activities} />
        </div>

        <div className="xl:col-span-5">
          <ConsoleCard logs={logs} />
        </div>

        <div className="xl:col-span-12">
          <KpiCard />
        </div>
      </div>

      <AssistantCard
        onSessionComplete={
          handleSessionComplete
        }
      />
    </div>
  );
}