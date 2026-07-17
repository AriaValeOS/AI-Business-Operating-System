export interface ApplicationModule {
  readonly name: string;

  initialize(): void | Promise<void>;
}