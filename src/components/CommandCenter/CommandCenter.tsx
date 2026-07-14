"use client";

import { useState } from "react";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { brain } from "@/services/brain/Brain";
import { businessCycleRunner } from "@/services/business/BusinessCycleRunner";

import ActivityCard from "./cards/ActivityCard";
import AssistantCard from "./cards/AssistantCard";
import BrainCard from "./cards/BrainCard";
import ConsoleCard from "./cards/ConsoleCard";
import KpiCard from "./cards/KpiCard";
import ProjectCard from "./cards/ProjectCard";
import QueueCard from "./cards/QueueCard";
import HeroWidget from "./widgets/HeroWidget";

export default function CommandCenter() {
  const [queueCount, setQueueCount] = useState(0);
  const [brainStatus, setBrainStatus] = useState(brain.think());
  const [activities, setActivities] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [, setDashboardVersion] = useState(0);

  function refreshDashboard() {
    setDashboardVersion((version) => version + 1);
  }

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
        const time = new Date().toLocaleTimeString();

        setQueueCount(result.queueCount);
        setBrainStatus(status);

        setActivities((prev) => [
          `${time} • ${result.message}`,
          `${time} • Queue updated (${result.queueCount} items)`,
          ...result.logs.map(
            (log: string) => `${time} • ${log}`
          ),
          ...prev,
        ]);

        setLogs(result.logs);
        setIsRunning(false);
        setIsCompleted(true);

        refreshDashboard();
      },
    });
  }

  return (
    <div>
      <div className="mb-4">
        <HeroWidget
          onStartBusinessDay={handleSessionComplete}
          isRunning={isRunning}
          isCompleted={isCompleted}
        />
      </div>

      <div className="mb-4">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ProjectCard />
        <QueueCard queueCount={queueCount} />
        <KpiCard />
        <BrainCard brainStatus={brainStatus} />
      </div>

      <div className="mt-4">
        <ActivityCard items={activities} />
      </div>

      <div className="mt-4">
        <ConsoleCard logs={logs} />
      </div>

      <div className="mt-4">
        <AssistantCard
          onSessionComplete={handleSessionComplete}
        />
      </div>
    </div>
  );
}