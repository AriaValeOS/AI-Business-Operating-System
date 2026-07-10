"use client";

import { useState } from "react";

import { brain } from "@/services/brain/Brain";
import { aiSession } from "@/services/session/AISession";

import MissionCard from "./cards/MissionCard";
import ProjectCard from "./cards/ProjectCard";
import QueueCard from "./cards/QueueCard";
import AssistantCard from "./cards/AssistantCard";
import BrainCard from "./cards/BrainCard";
import ActivityCard from "./cards/ActivityCard";
import ConsoleCard from "./cards/ConsoleCard";
import KpiCard from "./cards/KpiCard";

export default function CommandCenter() {
  const [queueCount, setQueueCount] = useState(0);
  const [brainStatus, setBrainStatus] = useState(brain.think());
  const [activities, setActivities] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  function handleSessionComplete() {
    const result = aiSession.run();
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
  }

  return (
    <div>
      {/* Goal */}
      <div className="mb-6">
        <MissionCard />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProjectCard />

        <QueueCard queueCount={queueCount} />

        <KpiCard />

        <BrainCard brainStatus={brainStatus} />
      </div>

      {/* Activity */}
      <div className="mt-6">
        <ActivityCard items={activities} />
      </div>

      {/* Console */}
      <div className="mt-6">
        <ConsoleCard logs={logs} />
      </div>

      {/* Assistant */}
      <div className="mt-6">
        <AssistantCard onSessionComplete={handleSessionComplete} />
      </div>
    </div>
  );
}