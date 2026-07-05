export type AgentResult = {
  message: string;
  queueItems: string[];
  logs: string[];
};

export interface Agent {
  name: string;
  task: string;
  run(): AgentResult;
}