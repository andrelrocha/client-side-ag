import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import {
  SignInRequestDTO,
  TokenResponseDTO,
  ForgotPasswordRequestDTO,
  ApiResponseDTO,
  MessageResponseDTO,
} from '../../dto';

interface TokenPayload {
  sub: string;
  roles: Array<string>;
  iss: string;
  id: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private _authToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(data: SignInRequestDTO): Observable<ApiResponseDTO<TokenResponseDTO>> {
    return this.http.post<ApiResponseDTO<TokenResponseDTO>>(
      `${this.apiUrl}/auth/signin`,
      data,
      { withCredentials: true }
    );
  }

  refresh(): Observable<ApiResponseDTO<TokenResponseDTO>> {
    return this.http.post<ApiResponseDTO<TokenResponseDTO>>(
      `${this.apiUrl}/auth/refresh`,
      {},
      { withCredentials: true }
    );
  }

  forgotPassword(data: ForgotPasswordRequestDTO): Observable<ApiResponseDTO<MessageResponseDTO>> {
    return this.http.post<ApiResponseDTO<MessageResponseDTO>>(
      `${this.apiUrl}/auth/password/forgot`,
      data
    );
  }

  setToken(token: string): void {
    this._authToken = token;
  }

  getToken(): string | null {
    return this._authToken;
  }

  logout(): void {
    this._authToken = null;
  }

  getTokenPayload(): TokenPayload | null {
    const token = this._authToken;
    if (!token) return null;
    return jwtDecode(token);
  }
}
