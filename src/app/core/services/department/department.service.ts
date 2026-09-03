import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../models/api-response';
import { DepartmentModel } from '../../../models/department/department.model';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getDepartments(): Observable<ApiResponse<DepartmentModel[]>> {
    return this.http.get<ApiResponse<DepartmentModel[]>>(
      `${this.apiUrl}/Department`
    );
  }

  getDepartmentById(id: number): Observable<ApiResponse<DepartmentModel>> {
    return this.http.get<ApiResponse<DepartmentModel>>(
      `${this.apiUrl}/Department/${id}`
    );
  }

  addDepartment(
    department: DepartmentModel
  ): Observable<ApiResponse<DepartmentModel>> {
    return this.http.post<ApiResponse<DepartmentModel>>(
      `${this.apiUrl}/Department`,
      department
    );
  }

  updateDepartment(
    id: number,
    department: DepartmentModel
  ): Observable<ApiResponse<DepartmentModel>> {
    return this.http.put<ApiResponse<DepartmentModel>>(
      `${this.apiUrl}/Department/${id}`,
      department
    );
  }

  deleteDepartment(id: number): Observable<ApiResponse<DepartmentModel>> {
    return this.http.delete<ApiResponse<DepartmentModel>>(
      `${this.apiUrl}/Department/${id}`
    );
  }
}

