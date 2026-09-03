import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../models/api-response';
import { ChangePasswordRequest } from '../../../models/auth/change-password-request';
import { CurrentUser } from '../../../models/auth/current-user';
import { LoginRequest } from '../../../models/auth/login-request';
import { LoginResponse } from '../../../models/auth/login-response';

@Injectable({
providedIn: 'root'
})

export class AuthService {

private readonly http = inject(HttpClient);
private readonly apiUrl = environment.apiUrl;

login(
loginRequest: LoginRequest
): Observable<ApiResponse<LoginResponse>> {
return this.http.post<ApiResponse<LoginResponse>>(
`${this.apiUrl}/Auth/Login`,
loginRequest
);
}

getCurrentUser(): Observable<ApiResponse<CurrentUser>> {
return this.http.get<ApiResponse<CurrentUser>>(
`${this.apiUrl}/Auth/CurrentUser`
);
}

changePassword(
request: ChangePasswordRequest
): Observable<ApiResponse<unknown>> {
return this.http.put<ApiResponse<unknown>>(
`${this.apiUrl}/Auth/ChangePassword`,
request
);
}

logout(): void {
localStorage.removeItem('token');
localStorage.removeItem('refreshToken');
localStorage.removeItem('currentUser');

localStorage.setItem(
  'logoutEvent',
  Date.now().toString()
);

}
}
