import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformConfiguration, PlatformSummary } from '../../platform-engine/models';

const API_BASE = '/api/platforms';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly http = inject(HttpClient);

  getAllPlatforms(): Observable<PlatformSummary[]> {
    return this.http.get<PlatformSummary[]>(API_BASE);
  }

  getPlatform(id: string): Observable<PlatformSummary> {
    return this.http.get<PlatformSummary>(`${API_BASE}/${id}`);
  }

  getPlatformConfiguration(id: string): Observable<PlatformConfiguration> {
    return this.http.get<PlatformConfiguration>(`${API_BASE}/${id}/configuration`);
  }
}
