export type BusinessEventType =
  | "employee.started"
  | "employee.progressed"
  | "employee.completed"
  | "employee.failed"
  | "decision.created"
  | "decision.approval-requested"
  | "decision.approved"
  | "decision.rejected"
  | "decision.execution-started"
  | "decision.completed"
  | "decision.failed"
  | "business-cycle.started"
  | "business-cycle.completed"
  | "goal.created"
  | "goal.updated"
  | "goal.completed"
  | "automation.started"
  | "automation.completed"
  | "automation.failed"
  | "system.heartbeat";

export type BusinessEventSource =
  | "employee-runner"
  | "decision-engine"
  | "decision-service"
  | "approval-service"
  | "decision-executor"
  | "business-engine"
  | "business-cycle-runner"
  | "goal-service"
  | "automation-engine"
  | "system";

export interface BusinessEventMetadata {
  organizationId?: string;
  userId?: string;
  correlationId?: string;
  causationId?: string;
}

export interface BusinessEvent<
  TPayload = Record<string, unknown>,
> {
  id: string;
  type: BusinessEventType;
  source: BusinessEventSource;
  payload: TPayload;
  metadata: BusinessEventMetadata;
  occurredAt: string;
}

export type BusinessEventHandler<
  TPayload = Record<string, unknown>,
> = (
  event: BusinessEvent<TPayload>
) => void | Promise<void>;