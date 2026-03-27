import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditDashboardResponse } from '../models/audit-report.model';

@Injectable({ providedIn: 'root' })
export class AuditDataService {
  constructor(private http: HttpClient) {}

getAuditData(): Observable<AuditDashboardResponse> {
    return this.http.get<AuditDashboardResponse>('/assets/data/audit-report.json');
  }
}
