import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeConfig } from '../../platform-engine/models';

const API_BASE = '/api/themes';

@Injectable({ providedIn: 'root' })
export class ThemeApiService {
  private readonly http = inject(HttpClient);

  getAllThemes(): Observable<ThemeConfig[]> {
    return this.http.get<ThemeConfig[]>(API_BASE);
  }

  getTheme(id: string): Observable<ThemeConfig> {
    return this.http.get<ThemeConfig>(`${API_BASE}/${id}`);
  }
}
