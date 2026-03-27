import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AuditDataService } from '../../services/audit-data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PortkeyUsersData } from '../../models/audit-report.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-andromeda-users',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    MatCardModule,
    BaseChartDirective,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './andromeda-users.component.html',
  styleUrls: ['./andromeda-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AndromedaUsersComponent implements OnInit {
  public data$!: Observable<PortkeyUsersData>;
  public readonly asOfDateControl = new FormControl<Date | null>(new Date());

  // Donut Chart Config
  public donutChartType: ChartType = 'doughnut';
  public donutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    }
  };

  // Bar Chart Config
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  constructor(private auditService: AuditDataService) {}

  ngOnInit(): void {
    this.data$ = this.auditService.getAuditData().pipe(
      map(res => res.PortkeyUsers)
    );
  }

  public getDonutData(statusBreakdown: any[]): ChartData<'doughnut'> {
    return {
      labels: statusBreakdown?.map(s => s.category) || [],
      datasets: [{
        data: statusBreakdown?.map(s => s.value) || [],
        backgroundColor: statusBreakdown?.map(s => s.color) || [],
      }]
    };
  }

  public getBarData(counts: any): ChartData<'bar'> {
    return {
      labels: ['FIGNEWTON HQ', 'FIGNEWTON Regional', 'State/Territory', 'Vendors', 'YOYOs', 'Festivus'],
      datasets: [{
        data: [
          counts?.FIGNEWTONHq || 0, 
          counts?.FIGNEWTONRegional || 0, 
          counts?.stateTerritory || 0, 
          counts?.vendor || 0, 
          counts?.YOYOs || 0, 
          counts?.FestivusOutsideFIGNEWTON || 0
        ],
        backgroundColor: '#d1345b'
      }]
    };
  }
}
