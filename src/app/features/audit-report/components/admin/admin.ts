import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { rxResource } from '@angular/core/rxjs-interop';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class AdminComponent {
  private adminDataService = inject(AdminDataService);

  // Using rxResource to fetch data as per Angular 21 standards
  tasksResource = rxResource({
    stream: () => this.adminDataService.getAdminTasks(),
  });

  displayedColumns: string[] = ['id', 'taskName', 'status', 'priority'];
}
