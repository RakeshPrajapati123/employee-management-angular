import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { DesignationModel } from '../../models/designation.model';
import { RoleModel } from '../../models/role.model';
import { ApiResponse } from '../../models/api-response';
import { AddEmployeeRequest } from '../../models/add-employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
   private http = inject(HttpClient);
   private apiUrl = environment.apiUrl;

   getEmployees(): Observable<ApiResponse<EmployeeModel[]>> {

  return this.http.get<ApiResponse<EmployeeModel[]>>(
    `${this.apiUrl}/Employee`
  );

}

 // ================= Designation =================

  getDesignations(): Observable<ApiResponse<DesignationModel[]>> {

    return this.http.get<ApiResponse<DesignationModel[]>>(
      `${this.apiUrl}/Designation`
    );

  }

  // ================= Role =================

  getRoles(): Observable<ApiResponse<RoleModel[]>> {

    return this.http.get<ApiResponse<RoleModel[]>>(
      `${this.apiUrl}/Role`
    );

  }

  addEmployee(employee: AddEmployeeRequest): Observable<ApiResponse<EmployeeModel>> {

  return this.http.post<ApiResponse<EmployeeModel>>(
    `${this.apiUrl}/Employee`,
    employee
  );

}

getEmployeeById(id: number): Observable<ApiResponse<EmployeeModel>> {

  return this.http.get<ApiResponse<EmployeeModel>>(
    `${this.apiUrl}/Employee/${id}`
  );

}

}
