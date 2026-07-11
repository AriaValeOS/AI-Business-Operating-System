"use client";

import { useState } from "react";

import { brain } from "@/services/brain/Brain";
import { businessEngine } from "@/services/business/BusinessEngine";
import ProjectCard from "./cards/ProjectCard";
import QueueCard from "./cards/QueueCard";
import AssistantCard from "./cards/AssistantCard";
import BrainCard from "./cards/BrainCard";
import ActivityCard from "./cards/ActivityCard";
import ConsoleCard from "./cards/ConsoleCard";
import KpiCard from "./cards/KpiCard";
import HeroWidget from "./widgets/HeroWidget";

export default function CommandCenter() {
  const [queueCount, setQueueCount] = useState(0);
  const [brainStatus, setBrainStatus] = useState(brain.think());
  const [activities, setActivities] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  function handleSessionComplete() {
    setIsCompleted(false);
    setIsRunning(true);

    setTimeout(() => {
      const result = businessEngine.startBusinessDay();
      const status = brain.think();
      const time = new Date().toLocaleTimeString();

      setQueueCount(result.queueCount);
      setBrainStatus(status);

      setActivities((prev) => [
        `${time} • ${result.message}`,
        `${time} • Queue updated (${result.queueCount} items)`,
        ...prev,
      ]);

      setLogs(result.logs);
      setIsCompleted(true);
      setIsRunning(false);
    }, 1500);
  }

  return (
    <div>
      <div className="mb-6">
        <HeroWidget
          onStartBusinessDay={handleSessionComplete}
          isRunning={isRunning}
          isCompleted={isCompleted}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProjectCard />
        <QueueCard queueCount={queueCount} />
        <KpiCard />
        <BrainCard brainStatus={brainStatus} />
      </div>

      <div className="mt-6">
        <ActivityCard items={activities} />
      </div>

      <div className="mt-6">
        <ConsoleCard logs={logs} />
      </div>

      <div className="mt-6">
        <AssistantCard onSessionComplete={handleSessionComplete} />
      </div>
    </div>
  );
}