import type {
  BusinessEvent,
  BusinessEventHandler,
  BusinessEventType,
} from "@/types/events";

import type {
  EventSubscription,
  IBusinessEventBus,
} from "./IBusinessEventBus";

export class MemoryBusinessEventBus
  implements IBusinessEventBus
{
  private handlers = new Map<
    BusinessEventType,
    Set<BusinessEventHandler>
  >();

  private globalHandlers =
    new Set<BusinessEventHandler>();

  async publish<TPayload>(
    event: BusinessEvent<TPayload>
  ): Promise<void> {
    const eventHandlers =
      this.handlers.get(event.type) ?? new Set();

    const handlersToExecute = [
      ...eventHandlers,
      ...this.globalHandlers,
    ];

    const results = await Promise.allSettled(
      handlersToExecute.map((handler) =>
        handler(
          event as BusinessEvent<
            Record<string, unknown>
          >
        )
      )
    );

    results.forEach((result) => {
      if (result.status === "rejected") {
        console.error(
          `[BusinessEventBus] Handler failed for ${event.type}:`,
          result.reason
        );
      }
    });
  }

  subscribe<TPayload>(
    eventType: BusinessEventType,
    handler: BusinessEventHandler<TPayload>
  ): EventSubscription {
    const currentHandlers =
      this.handlers.get(eventType) ??
      new Set<BusinessEventHandler>();

    const normalizedHandler =
      handler as BusinessEventHandler;

    currentHandlers.add(normalizedHandler);
    this.handlers.set(eventType, currentHandlers);

    return () => {
      const handlers =
        this.handlers.get(eventType);

      handlers?.delete(normalizedHandler);

      if (handlers?.size === 0) {
        this.handlers.delete(eventType);
      }
    };
  }

  subscribeToAll(
    handler: BusinessEventHandler
  ): EventSubscription {
    this.globalHandlers.add(handler);

    return () => {
      this.globalHandlers.delete(handler);
    };
  }

  clear(): void {
    this.handlers.clear();
    this.globalHandlers.clear();
  }
}