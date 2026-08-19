import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/product.model';

const API_BASE = '/api/categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);

  getByPlatform(platformId: string): Observable<Category[]> {
    const params = new HttpParams().set('platformId', platformId);
    return this.http.get<Category[]>(API_BASE, { params });
  }
}
