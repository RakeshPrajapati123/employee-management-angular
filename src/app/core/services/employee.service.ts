import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../models/employee.model';
import { DesignationModel } from '../../models/designation.model';
import { RoleModel } from '../../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
   private http = inject(HttpClient);
   private apiUrl = environment.apiUrl;

   getEmployees(): Observable<EmployeeModel[]> {

  return this.http.get<EmployeeModel[]>(
    `${this.apiUrl}/Employee/GetAllEmployees`
  );

}

 // ================= Designation =================

  getDesignations(): Observable<DesignationModel[]> {

    return this.http.get<DesignationModel[]>(
      `${this.apiUrl}/Designation/GetAllDesignations`
    );

  }

  // ================= Role =================

  getRoles(): Observable<RoleModel[]> {

    return this.http.get<RoleModel[]>(
      `${this.apiUrl}/Role/GetAllRoles`
    );

  }

}
