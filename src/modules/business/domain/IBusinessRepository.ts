import type {
  Business,
  BusinessId,
} from "./Business";

export interface IBusinessRepository {
  save(business: Business): Promise<void>;

  findById(
    businessId: BusinessId,
  ): Promise<Business | null>;

  findAll(): Promise<Business[]>;

  existsByName(name: string): Promise<boolean>;

  delete(
    businessId: BusinessId,
  ): Promise<void>;
}