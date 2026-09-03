export interface UserModel {

  loginID: number;
  employeeID: number;
  employeeName: string;
  email: string;
  department?: string | null;
  designation?: string | null;
  role?: string | null;
  isActive: boolean;
  lastLoginDate?: string | null;
  createdDate: string;
  
}