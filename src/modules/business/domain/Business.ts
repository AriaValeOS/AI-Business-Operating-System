export type BusinessId = string;

export type BusinessStatus =
  | "active"
  | "paused"
  | "archived";

export type BusinessPlan =
  | "free"
  | "starter"
  | "professional"
  | "enterprise";

export interface CreateBusinessInput {
  name: string;
  description?: string;
  plan?: BusinessPlan;
}

export interface BusinessSnapshot {
  id: BusinessId;
  name: string;
  description: string;
  status: BusinessStatus;
  plan: BusinessPlan;
  createdAt: string;
  updatedAt: string;
}

interface BusinessProps {
  id: BusinessId;
  name: string;
  description: string;
  status: BusinessStatus;
  plan: BusinessPlan;
  createdAt: Date;
  updatedAt: Date;
}

function generateBusinessId(): BusinessId {
  return crypto.randomUUID();
}

function normalizeRequiredText(
  value: string,
  fieldName: string,
): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    throw new Error(
      `${fieldName} cannot be empty.`,
    );
  }

  return normalizedValue;
}

export class Business {
  private constructor(
    private props: BusinessProps,
  ) {}

  static create(
    input: CreateBusinessInput,
  ): Business {
    const now = new Date();

    return new Business({
      id: generateBusinessId(),
      name: normalizeRequiredText(
        input.name,
        "Business name",
      ),
      description:
        input.description?.trim() ?? "",
      status: "active",
      plan: input.plan ?? "starter",
      createdAt: now,
      updatedAt: now,
    });
  }

  static rehydrate(
    snapshot: BusinessSnapshot,
  ): Business {
    return new Business({
      id: snapshot.id,
      name: snapshot.name,
      description: snapshot.description,
      status: snapshot.status,
      plan: snapshot.plan,
      createdAt: new Date(snapshot.createdAt),
      updatedAt: new Date(snapshot.updatedAt),
    });
  }

  get id(): BusinessId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get status(): BusinessStatus {
    return this.props.status;
  }

  get plan(): BusinessPlan {
    return this.props.plan;
  }

  get createdAt(): Date {
    return new Date(this.props.createdAt);
  }

  get updatedAt(): Date {
    return new Date(this.props.updatedAt);
  }

  rename(name: string): void {
    this.ensureNotArchived();

    const normalizedName =
      normalizeRequiredText(
        name,
        "Business name",
      );

    if (normalizedName === this.props.name) {
      return;
    }

    this.props.name = normalizedName;
    this.touch();
  }

  updateDescription(
    description: string,
  ): void {
    this.ensureNotArchived();

    const normalizedDescription =
      description.trim();

    if (
      normalizedDescription ===
      this.props.description
    ) {
      return;
    }

    this.props.description =
      normalizedDescription;

    this.touch();
  }

  changePlan(plan: BusinessPlan): void {
    this.ensureNotArchived();

    if (plan === this.props.plan) {
      return;
    }

    this.props.plan = plan;
    this.touch();
  }

  activate(): void {
    if (this.props.status === "archived") {
      throw new Error(
        "An archived business cannot be activated.",
      );
    }

    if (this.props.status === "active") {
      return;
    }

    this.props.status = "active";
    this.touch();
  }

  pause(): void {
    this.ensureNotArchived();

    if (this.props.status === "paused") {
      return;
    }

    this.props.status = "paused";
    this.touch();
  }

  archive(): void {
    if (this.props.status === "archived") {
      return;
    }

    this.props.status = "archived";
    this.touch();
  }

  toSnapshot(): BusinessSnapshot {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      status: this.props.status,
      plan: this.props.plan,
      createdAt:
        this.props.createdAt.toISOString(),
      updatedAt:
        this.props.updatedAt.toISOString(),
    };
  }

  private ensureNotArchived(): void {
    if (this.props.status === "archived") {
      throw new Error(
        "An archived business cannot be modified.",
      );
    }
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}