import type {
  BusinessEvent,
  BusinessEventHandler,
  BusinessEventType,
} from "@/types/events";

export type EventSubscription = () => void;

export interface IBusinessEventBus {
  publish<TPayload>(
    event: BusinessEvent<TPayload>
  ): Promise<void>;

  subscribe<TPayload>(
    eventType: BusinessEventType,
    handler: BusinessEventHandler<TPayload>
  ): EventSubscription;

  subscribeToAll(
    handler: BusinessEventHandler
  ): EventSubscription;

  clear(): void;
}