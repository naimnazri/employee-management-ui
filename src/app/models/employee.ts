export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  position?: string;
  dateOfJoining: string;
  createdAt: string;
}