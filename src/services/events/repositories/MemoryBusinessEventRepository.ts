import type { BusinessEvent } from "@/types/events";
import type { IBusinessEventRepository } from "./IBusinessEventRepository";

export class MemoryBusinessEventRepository
  implements IBusinessEventRepository
{
  private events: BusinessEvent[] = [];

  async save<TPayload>(
    event: BusinessEvent<TPayload>
  ): Promise<void> {
    this.events.unshift(
      event as BusinessEvent
    );
  }

  async getAll(): Promise<BusinessEvent[]> {
    return [...this.events];
  }

  async clear(): Promise<void> {
    this.events = [];
  }

  async count(): Promise<number> {
    return this.events.length;
  }

  async getLatest(
    limit = 20
  ): Promise<BusinessEvent[]> {
    return this.events.slice(0, limit);
  }
}