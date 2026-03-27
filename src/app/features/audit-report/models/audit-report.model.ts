export interface StatusBreakdownItem {
  category: string;
  value: number;
  count: number;
  color: string;
}

export interface RegionalCounts {
  FIGNEWTONHq: number;
  FIGNEWTONRegional: number;
  YOYOs: number;
  vendor: number;
  stateTerritory: number;
  FestivusOutsideFIGNEWTON: number;
}

export interface PortkeyUsersData {
  activeTotalUsers: number;
  statusBreakdown: StatusBreakdownItem[];
  regionalCounts: RegionalCounts;
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

export interface AuditDashboardResponse {
  PortkeyUsers: PortkeyUsersData;
  reCertification: CertificationData;
  admin: AdminData;
}