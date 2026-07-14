import { BusinessState } from "@/types/business";

class BusinessStateService {
  private state: BusinessState = "idle";

  getState(): BusinessState {
    return this.state;
  }

  setState(state: BusinessState): void {
    this.state = state;
  }

  isRunning(): boolean {
    return this.state === "running";
  }

  reset(): void {
    this.state = "idle";
  }
}

export const businessStateService =
  new BusinessStateService();