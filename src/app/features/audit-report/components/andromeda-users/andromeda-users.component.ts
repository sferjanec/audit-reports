import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChartModule, SparklineModule, StockChartModule } from '@progress/kendo-angular-charts';
import { LayoutModule, TileLayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule, DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { AuditDataService } from '../../services/audit-data';
import { Observable, BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { AuditUser, AuditDashboardResponse } from '../../models/audit-report.model';

@Component({
  selector: 'app-andromeda-users',
  standalone: true,
  imports: [
    AsyncPipe, 
    DecimalPipe, 
    ChartModule,
    SparklineModule,
    StockChartModule,
    LayoutModule,
    TileLayoutModule, 
    DateInputsModule,
    DatePickerModule, 
    GridModule
  ],
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
    this.rawData$ = this.auditService.getAuditData().pipe(
      tap(() => {
        // Force a window resize after a short delay to ensure Kendo components recalculate their layout
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 500);
      })
    );

    this.filteredGridData$ = combineLatest([
      this.rawData$,
      this.startDate$,
      this.endDate$
    ]).pipe(
      map(([data, start, end]) => {
        if (!data || !data.userDetails) return [];
        
        return data.userDetails.filter((user: AuditUser) => {
          // Flatten string dates to UTC midnight for consistent comparison
          const userDate = new Date(user.recertificationDate);
          userDate.setHours(0, 0, 0, 0);
          
          const s = start ? new Date(start) : null;
          if (s) s.setHours(0, 0, 0, 0);
          
          const e = end ? new Date(end) : null;
          if (e) e.setHours(23, 59, 59, 999);

          const isAfterStart = !s || userDate >= s;
          const isBeforeEnd = !e || userDate <= e;
          return isAfterStart && isBeforeEnd;
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

  public labelContent(args: any): string {
    const count = args.dataItem.value;
    const total = args.series.data.reduce((acc: number, item: any) => acc + item.value, 0);
    const percentage = ((count / total) * 100).toFixed(1);
    return `${count} users\n${percentage}%\n${args.category}`;
  }
}

