import { employeeFactory } from "./EmployeeFactory";

export const workforce = [
  employeeFactory.create({
    name: "Aria",
    department: "marketing",
    role: "Content Director",

    capabilities: [
      "generate-story",
      "create-caption",
      "create-image-prompt",
      "publish-content",
    ],

    aiModel: "OpenAI GPT",
    access: ["instagram", "gmail"],

    currentTask: "Instagram Campaign",
    progress: 82,
  }),

  employeeFactory.create({
    name: "Atlas",
    department: "analytics",
    role: "Analytics Director",

    capabilities: [
      "analyze-performance",
    ],

    aiModel: "OpenAI GPT",
    access: ["instagram"],

    currentTask: "Client Proposal",
    progress: 61,
  }),

  employeeFactory.create({
    name: "Nova",
    department: "research",
    role: "Research Analyst",

    capabilities: [
      "analyze-performance",
    ],

    aiModel: "OpenAI GPT",
    access: ["gmail"],

    currentTask: "Competitor Analysis",
    progress: 34,
  }),
];