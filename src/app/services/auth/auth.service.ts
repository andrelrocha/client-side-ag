import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { environment } from '../../../environments/environment';
import { SignInRequestDTO, ForgotPasswordRequestDTO, ApiResponseDTO } from '../../dto';


interface TokenPayload {
  sub: string;
  roles: Array<string>;
  iss: string;
  id: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: SignInRequestDTO): Observable<ApiResponseDTO<{
    token: string
  }>> {
    return this.http.post<ApiResponseDTO<{ token: string }>>(`${this.apiUrl}/auth/signin`, data);
  }

  forgotPassword(data: ForgotPasswordRequestDTO): Observable<ApiResponseDTO<{
    message: string
  }>> {
    return this.http.post<ApiResponseDTO<{ message: string }>>(`${this.apiUrl}/auth/password/forgot`, data);
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return jwtDecode(token);
  }
}
