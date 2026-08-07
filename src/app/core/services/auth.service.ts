import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(
    loginRequest: LoginRequest
  ): Observable<ApiResponse<LoginResponse>> {

    return this.http.post<ApiResponse<LoginResponse>>(
      `${this.apiUrl}/Auth/Login`,
      loginRequest
    );

  }

}
