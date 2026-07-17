import type { BusinessEvent } from "@/types/events";

import { businessEventRepository } from "./repositories";

class EventStoreService {
  async append<TPayload>(
    event: BusinessEvent<TPayload>
  ): Promise<void> {
    await businessEventRepository.save(event);
  }

  async getLatest(limit = 20) {
    return businessEventRepository.getLatest(
      limit
    );
  }

  async getAll() {
    return businessEventRepository.getAll();
  }

  async count() {
    return businessEventRepository.count();
  }

  async clear() {
    return businessEventRepository.clear();
  }
}

export const eventStore =
  new EventStoreService();