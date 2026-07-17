import type { BusinessEvent } from "@/types/events";

export interface IBusinessEventRepository {
  save<TPayload>(
    event: BusinessEvent<TPayload>
  ): Promise<void>;

  getAll(): Promise<BusinessEvent[]>;

  clear(): Promise<void>;

  count(): Promise<number>;

  getLatest(
    limit?: number
  ): Promise<BusinessEvent[]>;
}