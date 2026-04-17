import { Component } from '@angular/core';
import { LayoutModule, TabStripModule } from '@progress/kendo-angular-layout';
import { AndromedaUsersComponent } from './components/andromeda-users/andromeda-users.component';

@Component({
  selector: 'app-audit-report',
  standalone: true,
  imports: [LayoutModule, TabStripModule, AndromedaUsersComponent],
  templateUrl: './audit-report.html',
  styleUrl: './audit-report.scss',
})
export class AuditReport {}
