import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { TileLayoutModule } from '@progress/kendo-angular-layout';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs'; // Corrected import
import { GridModule } from '@progress/kendo-angular-grid'; // Add Grid
import { AuditDataService } from '../../services/audit-data';
import { Observable, BehaviorSubject, combineLatest, map } from 'rxjs';
import { AuditUser, AuditReportData, AuditDashboardResponse } from '../../models/audit-report.model';

@Component({
  selector: 'app-andromeda-users',
  imports: [AsyncPipe, DecimalPipe, ChartsModule, TileLayoutModule, DatePickerModule, GridModule],
  templateUrl: './andromeda-users.component.html',
  styleUrls: ['./andromeda-users.component.scss']
})
export class AndromedaUsersComponent implements OnInit {
  // --- FIGMA SPECIFIC COLORS ---
  public donutColors = ['#FFE162', '#4B5FFA', '#AC5BFF', '#FF5892'];
  public barColors = ['#FEE162', '#BAE1AC', '#4B5FFA', '#AC5BFF', '#FF7F27'];

  // --- Filter State ---
  public startDate$ = new BehaviorSubject<Date | null>(new Date('04/01/2026'));
  public endDate$ = new BehaviorSubject<Date | null>(new Date('04/12/2026'));

  // --- Core Dashboard Data ---
  public rawData$!: Observable<AuditDashboardResponse>;

// --- Filtered Grid Data ---
    public filteredGridData$!: Observable<AuditUser[]>;

  constructor(private auditService: AuditDataService) {}
  ngOnInit(): void {
    this.rawData$ = this.auditService.getAuditData();

    this.filteredGridData$ = combineLatest([
      this.rawData$,
      this.startDate$,
      this.endDate$
    ]).pipe(
      map(([data, start, end]) => {
        // Logic for filtering by modification date (entry_dttl)
        return data.userDetails.filter((user: AuditUser) => {
          const userDate = new Date(user.recertificationDate);
          return (!start || userDate >= start) && (!end || userDate <= end);
        });
      })
    );
  }

  public regions = ['FEMA HQ', 'FEMA Regional', 'WYO', 'Vendor', 'State', 'Federal'];
  public statuses = ['Active', 'Pending', 'Inactive', 'Terminated'];

  public getStatusData(status: string, data: any): number[] {
    const key = status.toLowerCase() as keyof any;
    return data.statusBreakdownsByRegion?.[key] || [];
  }
}

