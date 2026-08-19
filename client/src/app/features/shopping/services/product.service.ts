import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail, ProductSummary } from '../models/product.model';

const API_BASE = '/api/products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);

  getByPlatform(platformId: string): Observable<ProductSummary[]> {
    const params = new HttpParams().set('platformId', platformId);
    return this.http.get<ProductSummary[]>(API_BASE, { params });
  }

  getById(id: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${API_BASE}/${id}`);
  }
}
