# AuditDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Getting Started: Audit Reporting Dashboard

This guide provides the step-by-step instructions to initialize, configure, and run the Audit Reporting Dashboard prototype.

## 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js**: v18.0 or higher
* **npm**: v9.0 or higher
* **Angular CLI**: `npm install -g @angular/cli`

---

## 2. Project Initialization
Run the following command to scaffold the base project:

```bash
ng new audit-dashboard-prototype --routing --style scss --ssr false
cd audit-dashboard-prototype

Install Dependencies
npm install bootstrap @progress/kendo-angular-charts @progress/kendo-angular-layout @progress/kendo-angular-intl @progress/kendo-drawing @progress/kendo-licensing @progress/kendo-theme-bootstrap

Scaffold the feature structure
# 1. Create the feature module
ng generate module features/audit-report --routing

# 2. Create the shell component
ng generate component features/audit-report --module features/audit-report

# 3. Create the tab components
ng generate component features/audit-report/components/Portkey-users --module features/audit-report
ng generate component features/audit-report/components/Certification --module features/audit-report
ng generate component features/audit-report/components/admin --module features/audit-report

# 4. Create the data service
ng generate service features/audit-report/services/audit-data

Configuration Setup
A. Asset Management
Create the data directory and the mock JSON file:

Create folder: src/assets/data/

Create file: audit-report.json and paste the mock data provided in the architecture docs.

B. Global Styles
Open src/styles.scss and import the themes:
@import "@progress/kendo-theme-bootstrap/dist/all.css";
@import "bootstrap/dist/css/bootstrap-grid.min.css";
@import "bootstrap/dist/css/bootstrap-utilities.min.css";

C. Build Options
In angular.json, ensure the styles array includes Bootstrap:
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.scss"
]
Running the Application
Start the development server:
ng serve -o

Troubleshooting
Kendo Watermark: This is expected if you haven't activated a license key. The components remain fully functional for prototyping.

Module Errors: Ensure all Kendo modules (ChartsModule, LayoutModule) are imported in features/audit-report/audit-report.module.ts.