export type Company = {
  id: string;

  name: string;

  industry: string;

  size: "solo" | "small" | "medium" | "enterprise";

  timezone: string;

  departments: string[];

  createdAt: number;

  updatedAt: number;
};