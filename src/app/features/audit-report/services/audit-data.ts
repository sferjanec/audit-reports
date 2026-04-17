import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuditDashboardResponse } from '../models/audit-report.model';

@Injectable({ providedIn: 'root' })
export class AuditDataService {
  private dataUrl = 'assets/data/audit-report.json';
  constructor(private http: HttpClient) {}

getAuditData(): Observable<AuditDashboardResponse> {
    return this.http.get<AuditDashboardResponse>(this.dataUrl);
  }
}
