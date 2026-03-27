import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AndromedaUsersComponent } from './components/andromeda-users/andromeda-users.component';

@Component({
  selector: 'app-audit-report',
  standalone: true,
  imports: [MatTabsModule, AndromedaUsersComponent],
  templateUrl: './audit-report.html',
  styleUrl: './audit-report.scss',
})
export class AuditReport {}
