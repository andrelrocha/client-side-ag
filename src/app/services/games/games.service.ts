import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponseDTO, GameResponseDTO, Page } from '../../dto';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGames(
    page: number = 0,
    size: number = 20,
    sortField: string = 'name',
    sortOrder: string = 'asc',
    id?: string,
    name?: string,
    startYear?: number,
    endYear?: number
  ): Observable<ApiResponseDTO<Page<GameResponseDTO>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);

    if (id) params = params.set('id', id);
    if (name) params = params.set('name', name);
    if (startYear !== undefined) params = params.set('startYear', startYear.toString());
    if (endYear !== undefined) params = params.set('endYear', endYear.toString());

    return this.http.get<ApiResponseDTO<Page<GameResponseDTO>>>(`${this.apiUrl}/games`, { params });
  }
}
