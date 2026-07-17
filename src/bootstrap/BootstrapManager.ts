import type { ApplicationModule } from "@/modules/ApplicationModule";

class BootstrapManager {
  private readonly modules: ApplicationModule[] = [];
  private initialized = false;

  register(appModule: ApplicationModule): void {
    const alreadyRegistered = this.modules.some(
      (registeredModule) =>
        registeredModule.name === appModule.name,
    );

    if (alreadyRegistered) {
      return;
    }

    this.modules.push(appModule);
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    for (const appModule of this.modules) {
      await appModule.initialize();

      console.log(
        `[Bootstrap] ${appModule.name} initialized`,
      );
    }

    this.initialized = true;

    console.log("[Bootstrap] All modules initialized.");
  }

  getModules(): string[] {
    return this.modules.map(
      (registeredModule) => registeredModule.name,
    );
  }

  isInitialized(): boolean {
    return this.initialized;
  }
}

export const bootstrapManager = new BootstrapManager();