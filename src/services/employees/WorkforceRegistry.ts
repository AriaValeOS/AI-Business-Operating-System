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
  }),

  employeeFactory.create({
    name: "Atlas",
    department: "analytics",
    role: "Analytics Director",
    capabilities: ["analyze-performance"],
    aiModel: "OpenAI GPT",
    access: ["instagram"],
  }),
];