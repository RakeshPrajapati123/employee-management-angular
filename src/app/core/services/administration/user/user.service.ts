import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiResponse } from '../../../../models/api-response';
import { UserModel } from '../../../../models/administration/user/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ApiResponse<UserModel[]>> {

    return this.http.get<ApiResponse<UserModel[]>>(
      `${this.apiUrl}/Auth/Users`
    );

  }

  updateUserStatus(
    loginId: number,
    isActive: boolean
  ): Observable<ApiResponse<any>> {

    return this.http.put<ApiResponse<any>>(
      `${this.apiUrl}/Auth/Users/${loginId}/Status`,
      { isActive }
    );

  }
  
}
