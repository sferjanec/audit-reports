import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminTask } from '../models/audit-report.model';

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  private http = inject(HttpClient);
  private mockUrl = '/assets/data/admin-tasks.json';

  getAdminTasks(): Observable<AdminTask[]> {
    return this.http.get<AdminTask[]>(this.mockUrl);
  }
}