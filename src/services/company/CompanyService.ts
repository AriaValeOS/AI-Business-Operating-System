import { Company } from "@/types/company";

class CompanyService {
  private company: Company = {
    id: crypto.randomUUID(),

    name: "AI Business OS",

    industry: "Artificial Intelligence",

    size: "small",

    timezone: "Europe/Helsinki",

    departments: [
      "marketing",
      "analytics",
    ],

    createdAt: Date.now(),

    updatedAt: Date.now(),
  };

  getCompany(): Company {
    return this.company;
  }

  updateCompany(data: Partial<Company>) {
    this.company = {
      ...this.company,
      ...data,
      updatedAt: Date.now(),
    };
  }
}

export const companyService = new CompanyService();