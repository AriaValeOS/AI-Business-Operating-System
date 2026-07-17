import type { BusinessEvent } from "@/types/events";

export interface IProjection {
  readonly name: string;

  project(event: BusinessEvent): Promise<void>;

  reset?(): Promise<void>;
}