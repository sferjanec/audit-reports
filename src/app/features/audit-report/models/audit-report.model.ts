export interface StatusBreakdownItem {
  category: string;
  value: number;
  count: number;
  color: string;
}

export interface RegionalCounts {
  femaHq: number;
  femaRegional: number;
  wyo: number;
  vendor: number;
  stateTerritory: number;
  federalOutsideFema: number;
}

export interface AuditReportData {
  activeTotalUsers: number;
  statusBreakdown: StatusBreakdownItem[];
  regionalCounts: RegionalCounts;
  userDetails:  AuditUser[];
  statusBreakdownsByRegion?: {
    active: number[];
    pending: number[];
    inactive: number[];
    terminated: number[];
  };
}

export interface CertStatusItem {
  type: 'Completed' | 'In Progress' | 'Overdue';
  count: number;
  color: string;
}

export interface CertTimelineItem {
  month: string;
  count: number;
}

export interface  CertificationData {
  completionRate: number;
  totalCycles: number;
  status: CertStatusItem[];
  timeline: CertTimelineItem[];
}

export interface AdminRoleItem {
  role: string;
  count: number;
}

export interface AdminLogItem {
  user: string;
  action: string;
  timestamp: string; // Or Date if you parse it in the service
}

export interface AdminData {
  systemStatus: 'Healthy' | 'Degraded' | 'Down';
  lastAuditDate: string;
  adminRoles: AdminRoleItem[];
  recentLogs: AdminLogItem[];
}

export interface AuditDashboardResponse extends AuditReportData {
  reCertification?: CertificationData;
  admin?: AdminData;
}

/**
 * Detailed user record for the 'Detailed User Pull' grid.
 */
export interface AuditUser {
  firstName: string;
  lastName: string;
  uniqueId: string;
  accountStatus: UserAccountStatus;
  organization: string;
  orgType: string;
  role: string;
  permissions: string[]; // Stored as an array for easier filtering/logic
  creationDate: Date | string;
  recertificationDate: Date | string;
  lastLoginDate: Date | string;
}

export type UserAccountStatus = 'Active' | 'Pending' | 'Inactive' | 'Terminated';