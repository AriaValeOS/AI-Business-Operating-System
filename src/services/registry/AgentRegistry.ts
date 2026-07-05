export type AgentTask =
  | "instagram-content"
  | "analytics-report";

export type RegisteredAgent = {
  name: string;
  task: AgentTask;
  run: () => {
    message: string;
    queueItems: string[];
    logs: string[];
  };
};

class AgentRegistry {
  private agents: RegisteredAgent[] = [];

  register(agent: RegisteredAgent) {
    this.agents.push(agent);
  }

  findByTask(task: AgentTask) {
    return this.agents.find((agent) => agent.task === task);
  }

  getAll() {
    return this.agents;
  }
}

export const agentRegistry = new AgentRegistry();