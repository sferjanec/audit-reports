# Architectural Design Document: Audit Reporting Dashboard

## 1. Design Overview
The application is built on a **Modern Hybrid Stack** designed to balance rapid prototyping with enterprise-grade stability. 

* **Angular 21:** Serves as the core framework, handling dependency injection, routing, and component life cycles.
* **Kendo UI for Angular:** Provides the "heavy lifting" for data visualization. By using Kendo’s specialized components (Donut Charts, Bar Charts, TabStrips), we ensure high performance and accessibility without building complex SVG logic from scratch.
* **Bootstrap 5:** Acts as the layout engine. We use Bootstrap’s responsive grid (`container`, `row`, `col`) and utility classes for spacing to keep the UI clean and consistent across different screen sizes.

---

## 2. Methodology & Component Strategy

### Feature-Based Architecture
Instead of a "flat" structure, we utilized **Feature-Driven Modules**. All logic related to "Audit Reporting" lives within its own directory. 
* **Scalability:** New features (like a "Claims Report") can be added as separate modules without interfering with existing code.
* **Lazy Loading:** The `AuditReportModule` is only loaded when the user navigates to the audit route, significantly reducing the initial application bundle size.

### Smart vs. Dumb (Presentational) Components
We followed the **Container/Component** pattern:
* **Smart Component (`AuditReportComponent`):** This is the "manager." It talks to the `AuditDataService`, fetches the JSON data, and handles the state of the tabs.
* **Dumb Components (`PortkeyUsersComponent`, etc.):** These are purely presentational. They receive data via `@Input()` and focus entirely on rendering the Kendo charts and Bootstrap tiles. This makes them highly reusable and easy to unit test.

---

## 3. Project Structure Tree
The project is organized to ensure that models, services, and UI components are decoupled.

```text
src/app/
└── features/
    └── audit-report/               
        ├── audit-report.module.ts  <-- Dependency registration
        ├── audit-report-routing.ts <-- Tab-specific navigation
        ├── audit-report.component  <-- The TabStrip Shell
        ├── models/                 
        │   └── audit-report.model  <-- The "Source of Truth" (Interfaces)
        ├── services/               
        │   └── audit-data.service  <-- Centralized Data Fetching
        └── components/             
            ├── Portkey-users/        <-- Main Dashboard (Charts & Cards)
            ├── Certification/   <-- Placeholder for Phase 2
            └── admin/              <-- System Logs Placeholder

Dashboard Design Pro-Tips
A. The "F-Pattern" Scanning
Users typically scan dashboards in an "F" shape. We placed the most critical metric (Active Total Users) in the top-left corner and the secondary breakdown (Donut Chart) immediately to its right to ensure the most important data is seen first.

B. Vertical Rhythm & Alignment
In a dashboard with multiple cards, visual noise is your enemy.

The Fix: Use Bootstrap’s d-flex and h-100 classes. This ensures that cards in the same row always have equal heights, creating a clean, professional "grid" feel even if one card has more text than another.

C. Semantic Color Coding
Color should communicate status, not just look pretty.

Pending: Yellow (Warning/Caution)

Active: Green/Blue (Success/Normal)

Terminated: Red (Critical/Stop)

Neutral: Gray (Inactive/Historical)

D. Component Encapsulation
By using ::ng-deep sparingly within a component's SCSS, we targeted specific Kendo styles (like legend fonts or chart margins) without leaking those styles into the rest of the application. This keeps the global styles.scss small and manageable.

Design Note: This structure was specifically chosen to allow "plug-and-play" development. As soon as the requirements for the Admin or Certification tabs are finalized, the developer only needs to update the models and the mock.json to see the UI reflect those changes.            