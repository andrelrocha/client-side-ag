import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponseDTO, CreateUserRequestDTO, CreateUserResponseDTO } from '../../dto';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(data: CreateUserRequestDTO): Observable<ApiResponseDTO<CreateUserResponseDTO>> {
    return this.http.post<ApiResponseDTO<CreateUserResponseDTO>>(`${this.apiUrl}/users`, data);
  }
}
