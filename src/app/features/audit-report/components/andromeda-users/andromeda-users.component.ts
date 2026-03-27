import { Component, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { TileLayoutModule } from '@progress/kendo-angular-layout';
import { AuditDataService } from '../../services/audit-data';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PortkeyUsersData } from '../../models/audit-report.model';

@Component({
  selector: 'app-andromeda-users',
  imports: [AsyncPipe, DecimalPipe, ChartsModule, TileLayoutModule],
  templateUrl: './andromeda-users.component.html',
  styleUrls: ['./andromeda-users.component.scss']
})
export class AndromedaUsersComponent implements OnInit {
  public data$!: Observable<PortkeyUsersData>;

  constructor(private auditService: AuditDataService) {}

  ngOnInit(): void {
    // We use an observable stream to automatically handle change detection 
    this.data$ = this.auditService.getAuditData().pipe(
      map(res => res.PortkeyUsers)
    );
  }
}
