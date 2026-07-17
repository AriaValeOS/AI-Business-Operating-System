import { activityRepository } from "./repositories";

class ActivityReadService {
  async getLatest(limit = 20) {
    return activityRepository.getLatest(limit);
  }

  async getLatestFive() {
    return activityRepository.getLatest(5);
  }

  async clear() {
    return activityRepository.clear();
  }
}

export const activityReadService =
  new ActivityReadService();