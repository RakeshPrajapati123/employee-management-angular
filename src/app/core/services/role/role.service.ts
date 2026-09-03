import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { RoleModel } from '../../../models/role/role.model';
import { ApiResponse } from '../../../models/api-response';

@Injectable({
  providedIn: 'root',
})

export class RoleService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  // ================= Role =================

  getRoles(): Observable<ApiResponse<RoleModel[]>> {

    return this.http.get<ApiResponse<RoleModel[]>>(
      `${this.apiUrl}/Role`
    );

  }

  getRoleById(
    id: number
  ): Observable<ApiResponse<RoleModel>> {

    return this.http.get<ApiResponse<RoleModel>>(
      `${this.apiUrl}/Role/${id}`
    );

  }

  addRole(
    role: RoleModel
  ): Observable<ApiResponse<RoleModel>> {

    return this.http.post<ApiResponse<RoleModel>>(
      `${this.apiUrl}/Role`,
      role
    );

  }

  updateRole(
    id: number,
    role: RoleModel
  ): Observable<ApiResponse<RoleModel>> {

    return this.http.put<ApiResponse<RoleModel>>(
      `${this.apiUrl}/Role/${id}`,
      role
    );

  }

  deleteRole(
    id: number
  ): Observable<ApiResponse<RoleModel>> {

    return this.http.delete<ApiResponse<RoleModel>>(
      `${this.apiUrl}/Role/${id}`
    );

  }

}

