import { Component } from '@angular/core';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { AndromedaUsersComponent } from './components/andromeda-users/andromeda-users.component';

@Component({
  selector: 'app-audit-report',
  imports: [TabStripModule, AndromedaUsersComponent],
  templateUrl: './audit-report.html',
  styleUrl: './audit-report.scss',
})
export class AuditReport {}
