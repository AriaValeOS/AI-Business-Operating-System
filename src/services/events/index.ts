import { MemoryBusinessEventBus } from "./MemoryBusinessEventBus";

export const businessEventBus =
  new MemoryBusinessEventBus();

export { BusinessEventFactory } from "./BusinessEventFactory";

export type {
  EventSubscription,
  IBusinessEventBus,
} from "./IBusinessEventBus";