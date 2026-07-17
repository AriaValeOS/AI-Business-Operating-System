import {
  Business,
  type BusinessPlan,
  type BusinessSnapshot,
  type IBusinessRepository,
} from "../domain";

export interface CreateBusinessCommand {
  name: string;
  description?: string;
  plan?: BusinessPlan;
}

export class CreateBusinessUseCase {
  constructor(
    private readonly businessRepository:
      IBusinessRepository,
  ) {}

  async execute(
    command: CreateBusinessCommand,
  ): Promise<BusinessSnapshot> {
    const normalizedName =
      command.name.trim();

    if (!normalizedName) {
      throw new Error(
        "Business name cannot be empty.",
      );
    }

    const alreadyExists =
      await this.businessRepository.existsByName(
        normalizedName,
      );

    if (alreadyExists) {
      throw new Error(
        `A business named "${normalizedName}" already exists.`,
      );
    }

    const business = Business.create({
      name: normalizedName,
      description: command.description,
      plan: command.plan,
    });

    await this.businessRepository.save(
      business,
    );

    return business.toSnapshot();
  }
}