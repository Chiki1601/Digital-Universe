import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentDetail, ContentSummary } from '../models/content.model';

const API_BASE = '/api/content';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  getByPlatform(platformId: string): Observable<ContentSummary[]> {
    const params = new HttpParams().set('platformId', platformId);
    return this.http.get<ContentSummary[]>(API_BASE, { params });
  }

  getById(id: string): Observable<ContentDetail> {
    return this.http.get<ContentDetail>(`${API_BASE}/${id}`);
  }
}
