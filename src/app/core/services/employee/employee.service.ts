import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../models/api-response';
import { AddEmployeeRequest } from '../../../models/employee/add-employee.model';
import { EmployeeGetDetailsModel } from '../../../models/employee/employee-get-details.model';
import { EmployeeModel } from '../../../models/employee/employee.model';
import { UpdateEmployeeRequest } from '../../../models/employee/update-employee.model';
import { DesignationModel } from '../../../models/designation/designation.model';
import { RoleModel } from '../../../models/role/role.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getEmployees(): Observable<ApiResponse<EmployeeModel[]>> {
    return this.http.get<ApiResponse<EmployeeModel[]>>(
      `${this.apiUrl}/Employee`
    );
  }

  getDesignations(): Observable<ApiResponse<DesignationModel[]>> {
    return this.http.get<ApiResponse<DesignationModel[]>>(
      `${this.apiUrl}/Designation`
    );
  }

  getRoles(): Observable<ApiResponse<RoleModel[]>> {
    return this.http.get<ApiResponse<RoleModel[]>>(
      `${this.apiUrl}/Role`
    );
  }

  addEmployee(
    employee: AddEmployeeRequest
  ): Observable<ApiResponse<EmployeeModel>> {
    return this.http.post<ApiResponse<EmployeeModel>>(
      `${this.apiUrl}/Employee`,
      employee
    );
  }

  updateEmployee(
    id: number,
    employee: UpdateEmployeeRequest
  ): Observable<ApiResponse<UpdateEmployeeRequest>> {
    return this.http.put<ApiResponse<UpdateEmployeeRequest>>(
      `${this.apiUrl}/Employee/${id}`,
      employee
    );
  }

  getEmployeeById(
    id: number
  ): Observable<ApiResponse<EmployeeGetDetailsModel>> {
    return this.http.get<ApiResponse<EmployeeGetDetailsModel>>(
      `${this.apiUrl}/Employee/${id}`
    );
  }

  deleteEmployee(id: number): Observable<ApiResponse<EmployeeModel>> {
    return this.http.delete<ApiResponse<EmployeeModel>>(
      `${this.apiUrl}/Employee/${id}`
    );
  }
}

