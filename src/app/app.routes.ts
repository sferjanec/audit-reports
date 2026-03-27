import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Lazy load the standalone component
  {
    path: 'admin/audit-reports',
    loadComponent: () => import('./features/audit-report/audit-report').then(c => c.AuditReport)
  },

  { path: '**', redirectTo: '' }
];