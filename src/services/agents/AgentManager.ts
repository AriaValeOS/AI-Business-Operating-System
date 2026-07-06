import { Agent, AgentResult } from "@/types/agent";
import { BrainDecision } from "@/types/brainDecision";
import { taskRegistry } from "@/services/registry/TaskRegistry";

type ManagedAgentResult = AgentResult & {
  agent: string;
};

export class AgentManager {
  run(decision: BrainDecision): ManagedAgentResult {
    const agent = taskRegistry.resolve(decision.task.type);

    if (!agent) {
      return {
        agent: "Unknown",
        message: "No matching task.",
        queueItems: [],
        logs: [`No agent found for task: ${decision.task.type}`],
      };
    }

    return this.runAgent(decision.task.reason, agent);
  }

  private runAgent(reason: string, agent: Agent): ManagedAgentResult {
    const result = agent.run();

    return {
      agent: agent.name,
      message: result.message,
      queueItems: result.queueItems,
      logs: [`Task: ${reason}`, ...result.logs],
    };
  }
}

export const agentManager = new AgentManager();