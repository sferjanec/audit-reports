# Developer Log

## Date: March 26, 2026

### 1. Component Refactoring: Portkey Users -> Andromeda Users
* **Directory Renamed:** Moved the child component directory from `src/app/features/audit-report/components/Portkey-users/` to `andromeda-users/`.
* **Files Renamed:** Renamed all component files to match the new naming convention:
  * `Portkey-users.component.ts` -> `andromeda-users.component.ts`
  * `Portkey-users.component.html` -> `andromeda-users.component.html`
  * `Portkey-users.component.scss` -> `andromeda-users.component.scss`
  * `Portkey-users.component.spec.ts` -> `andromeda-users.component.spec.ts`
* **Class & Selector Updates:** Performed a codebase-wide find-and-replace to update all references:
  * Class name updated from `PortkeyUsersComponent` to `AndromedaUsersComponent`.
  * Angular selector updated from `app-Portkey-users` to `app-andromeda-users`.
  * Internal variable formatting updated from `PortkeyUsers` to `andromedaUsers`.

### 2. Angular Standalone Component Import Fixes
Fixed multiple build errors (`NG8001`, `NG8002`, `NG8004`) caused by missing dependency imports in the new Angular Standalone Components paradigm (`imports: []` array).

* **`AuditReport` Component (`src/app/features/audit-report/audit-report.ts`):**
  * **Fix:** Imported `TabStripModule` from `@progress/kendo-angular-layout` to resolve the unknown `<kendo-tabstrip>` element error.
  * **Fix:** Imported `AndromedaUsersComponent` locally so the parent template could recognize the recently renamed `<app-andromeda-users>` element.

* **`AndromedaUsersComponent` Component (`../andromeda-users/andromeda-users.component.ts`):**
  * **Fix:** Imported `DecimalPipe` from `@angular/common` to resolve the unknown pipe error when using `{{ value | number }}` in the template.
  * **Fix:** Imported `ChartsModule` from `@progress/kendo-angular-charts` to resolve unknown element and property binding errors for all `<kendo-chart>`, `<kendo-chart-series>`, and related elements in the template.

### 3. Kendo UI Configuration & Lazy Loading Fixes
* **Lazy Loading Standalone Components:** Changed `app.routes.ts` to use `loadComponent` instead of `loadChildren` to route directly to the standalone `AuditReport` component, bypassing the empty and obsolete NgModule.
* **Kendo Localization ($localize):** Resolved `ReferenceError: $localize is not defined` crashes by running `ng add @angular/localize`, ensuring the global i18n APIs expected by Kendo UI were present.
* **Animations Module:** Fixed `NG05105: Unexpected synthetic property @state` errors by injecting Angular's modern async animations provider `provideAnimationsAsync()` into the global `app.config.ts` setup.

### 4. Async Data Loading & Change Detection Fixes in Andromeda Users
* **Data Mapping Fix:** The JSON response root structure contained multiple datasets (`PortkeyUsers`, `admin`, etc.). The component was mapping the entire root object directly. Fixed this by extracting only `res.PortkeyUsers` within the HTTP service response.
* **Absolute Path Fetch:** Added a leading slash to the generic HTTP GET `/assets/data/audit-report.json` in `audit-data.ts` to ensure the correct path resolves uniformly across lazy-loaded route levels.
* **Reactive Async Pipe Implementation:** Kendo UI Charts fail to detect implicit downstream data changes (staying in a "loading" / "no data" state) when embedded directly inside Kendo TabStrips. 
  * **The Fix:** Refactored the `AndromedaUsersComponent` data structure out of a manually subscribed local variable (`data`) and directly into an Observable stream (`data$`). 
  * **The Rationale:** Implemented Angular's built-in `@if (data$ | async; as data)` block handling in the template. The `async` pipe natively subscribes, automatically cleans up memory, and *crucially* queues explicit Angular Change Detection pushes precisely when the HTTP request resolves. This guarantees the Kendo widgets receive up-to-date DOM metrics and draw commands simultaneously.
* **Strict Type Cleanups:** Removing the optional chaining `?.` operators (`data?.regionalCounts` -> `data.regionalCounts`) globally throughout the template block. Because the view is safely guarded inside the strict `@if (data)` block, Angular template strict-mode properly assesses all children as definitively defined. 


