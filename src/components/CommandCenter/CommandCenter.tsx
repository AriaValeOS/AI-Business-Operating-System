"use client";

import { useState } from "react";

import { appConfig } from "@/config/app";
import { brain } from "@/services/brain/Brain";
import { aiSession } from "@/services/session/AISession";
import { runBusinessCycleDemo } from "@/services/demo/BusinessCycleDemo";

import MissionCard from "./cards/MissionCard";
import ProjectCard from "./cards/ProjectCard";
import QueueCard from "./cards/QueueCard";
import AssistantCard from "./cards/AssistantCard";
import BrainCard from "./cards/BrainCard";
import ActivityCard from "./cards/ActivityCard";
import ConsoleCard from "./cards/ConsoleCard";
import KpiCard from "./cards/KpiCard";

export default function CommandCenter() {
  const demo = runBusinessCycleDemo();

  const [queueCount, setQueueCount] = useState(0);
  const [brainStatus, setBrainStatus] = useState(brain.think());
  const [activities, setActivities] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

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
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Good evening, {appConfig.founder} 👋
        </h1>

        <p className="text-zinc-400 mt-2">{appConfig.tagline}</p>

        <p className="text-xs text-zinc-600 mt-4">{today}</p>
      </div>

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="text-sm text-zinc-500 mb-2">Business Cycle Demo</p>

        <h2 className="text-2xl font-bold">{demo.goal.title}</h2>

        <p className="text-zinc-400 mt-2">
          Department: {demo.goal.department}
        </p>

        <p className="text-zinc-400">
          KPI: {demo.goal.kpi.current} / {demo.goal.kpi.target}{" "}
          {demo.goal.kpi.unit}
        </p>

        <div className="mt-4 space-y-2">
          {demo.tasks.map((task) => (
            <p key={task.id} className="text-sm text-zinc-300">
              ✓ {task.type} — {task.status}
            </p>
          ))}
        </div>
      </div>

      {/* Goal */}
      <div className="mb-6">
        <MissionCard />
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-2 gap-6">
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