import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

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
export class Auth {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, { login, password });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/password/forgot`, { email });
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
