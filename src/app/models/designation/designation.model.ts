import { DepartmentModel } from '../department/department.model';

export interface DesignationModel {

  designationID: number;

  departmentID: number;

  designationName: string;

  isActive: boolean;

  department: DepartmentModel | null;

}