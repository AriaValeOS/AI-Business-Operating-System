import { Employee } from "@/types/employee";
import { workforce } from "./WorkforceRegistry";

class EmployeeService {
  getEmployees(): Employee[] {
    return workforce;
  }
}

export const employeeService = new EmployeeService();