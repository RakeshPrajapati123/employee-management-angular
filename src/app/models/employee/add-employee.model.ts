export interface AddEmployeeRequest {  

  employeeName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  alternatePhone?: string;
  designationID: number;
  roleID: number;
  isActive: boolean;
  
}