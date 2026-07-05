"use client";

import { useState } from "react";
import { appConfig } from "@/config/app";
import { brain } from "@/services/brain/Brain";
import { contentStore } from "@/services/store/ContentStore";

import MissionCard from "./cards/MissionCard";
import ProjectCard from "./cards/ProjectCard";
import QueueCard from "./cards/QueueCard";
import AssistantCard from "./cards/AssistantCard";
import BrainCard from "./cards/BrainCard";

export default function CommandCenter() {
  const [brainStatus, setBrainStatus] = useState(brain.think());
  const [queueCount, setQueueCount] = useState(contentStore.getQueueCount());

  function startAiSession() {
    brain.setStatus("thinking");

    contentStore.clear();
    contentStore.seedDemoData();

    setBrainStatus(brain.think());
    setQueueCount(contentStore.getQueueCount());
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Good evening, {appConfig.founder} 👋
        </h1>

        <p className="text-zinc-400 mt-2">Welcome back.</p>

        <p className="text-zinc-500 text-sm mt-1">
          Here&apos;s your business overview for today.
        </p>

        <p className="text-xs text-zinc-600 mt-4">{today}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MissionCard />

        <ProjectCard />

        <QueueCard queueCount={queueCount} />

        <AssistantCard onStartSession={startAiSession} />

        <BrainCard brainStatus={brainStatus} />
      </div>
    </div>
  );
}