import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { DesignationModel } from '../../../models/designation/designation.model';
import { ApiResponse } from '../../../models/api-response';
import { AddDesignationModel } from '../../../models/designation/add-designation.model';

@Injectable({
  providedIn: 'root',
})

export class DesignationService {

  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;

  // ================= Designation =================

  getDesignations(): Observable<ApiResponse<DesignationModel[]>> {

    return this.http.get<ApiResponse<DesignationModel[]>>(
      `${this.apiUrl}/Designation`
    );

  }

  getDesignationById(
    id: number
  ): Observable<ApiResponse<DesignationModel>> {

    return this.http.get<ApiResponse<DesignationModel>>(
      `${this.apiUrl}/Designation/${id}`
    );

  }

  addDesignation(
    designation: AddDesignationModel
  ): Observable<ApiResponse<AddDesignationModel>> {

    return this.http.post<ApiResponse<AddDesignationModel>>(
      `${this.apiUrl}/Designation`,
      designation
    );

  }

  updateDesignation(
    id: number,
    designation: DesignationModel
  ): Observable<ApiResponse<DesignationModel>> {

    return this.http.put<ApiResponse<DesignationModel>>(
      `${this.apiUrl}/Designation/${id}`,
      designation
    );

  }

  deleteDesignation(
    id: number
  ): Observable<ApiResponse<DesignationModel>> {

    return this.http.delete<ApiResponse<DesignationModel>>(
      `${this.apiUrl}/Designation/${id}`
    );

  }

}