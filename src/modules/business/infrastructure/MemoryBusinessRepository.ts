import {
  Business,
  type BusinessId,
  type BusinessSnapshot,
  type IBusinessRepository,
} from "../domain";

export class MemoryBusinessRepository
  implements IBusinessRepository
{
  private readonly businesses =
    new Map<BusinessId, BusinessSnapshot>();

  async save(
    business: Business,
  ): Promise<void> {
    this.businesses.set(
      business.id,
      business.toSnapshot(),
    );
  }

  async findById(
    businessId: BusinessId,
  ): Promise<Business | null> {
    const snapshot =
      this.businesses.get(businessId);

    if (!snapshot) {
      return null;
    }

    return Business.rehydrate(snapshot);
  }

  async findAll(): Promise<Business[]> {
    return Array.from(
      this.businesses.values(),
    ).map((snapshot) =>
      Business.rehydrate(snapshot),
    );
  }

  async existsByName(
    name: string,
  ): Promise<boolean> {
    const normalizedName =
      name.trim().toLocaleLowerCase();

    return Array.from(
      this.businesses.values(),
    ).some(
      (business) =>
        business.name
          .trim()
          .toLocaleLowerCase() ===
        normalizedName,
    );
  }

  async delete(
    businessId: BusinessId,
  ): Promise<void> {
    this.businesses.delete(businessId);
  }
}