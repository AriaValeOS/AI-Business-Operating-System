import type {
  BusinessEvent,
  BusinessEventMetadata,
  BusinessEventSource,
  BusinessEventType,
} from "@/types/events";

interface CreateBusinessEventInput<TPayload> {
  type: BusinessEventType;
  source: BusinessEventSource;
  payload: TPayload;
  metadata?: BusinessEventMetadata;
}

function createEventId(): string {
  const randomPart = Math.random()
    .toString(36)
    .slice(2, 10);

  return `event_${Date.now()}_${randomPart}`;
}

export class BusinessEventFactory {
  static create<TPayload>(
    input: CreateBusinessEventInput<TPayload>
  ): BusinessEvent<TPayload> {
    return {
      id: createEventId(),
      type: input.type,
      source: input.source,
      payload: input.payload,
      metadata: input.metadata ?? {},
      occurredAt: new Date().toISOString(),
    };
  }
}