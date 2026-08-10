import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../../../models/department/department.model';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../models/api-response';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  getDepartments(): Observable<ApiResponse<DepartmentModel[]>> {

  return this.http.get<ApiResponse<DepartmentModel[]>>(
  `${this.apiUrl}/Department`);  
}

getDepartmentById(
id: number
): Observable<ApiResponse<DepartmentModel>> {

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

deleteDepartment(
id: number
): Observable<ApiResponse<DepartmentModel>> {

return this.http.delete<ApiResponse<DepartmentModel>>(
  `${this.apiUrl}/Department/${id}`
);

}

}