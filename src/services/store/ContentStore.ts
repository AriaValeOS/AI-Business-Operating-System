export class ContentStore {
  private queue: string[] = [];

  getQueueCount() {
    return this.queue.length;
  }

  add(item: string) {
    this.queue.push(item);
  }

  clear() {
    this.queue = [];
  }

  getAll() {
    return this.queue;
  }

  seedDemoData() {
    this.queue = [
      "Instagram Story",
      "Instagram Post",
      "TikTok Script",
    ];
  }
}

export const contentStore = new ContentStore();