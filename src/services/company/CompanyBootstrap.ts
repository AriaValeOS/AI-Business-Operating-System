import { Company } from "@/types/company";

export class CompanyBootstrap {
  bootstrap(company: Company) {
    return {
      company,

      departments: company.departments,

      message: `${company.name} initialized successfully.`,
    };
  }
}

export const companyBootstrap = new CompanyBootstrap();