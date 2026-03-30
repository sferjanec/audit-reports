# Audit Dashboard Project Context
- **Tech Stack:** Angular 21, Material UI, Chart.js.
- **Architecture:** Feature-based modules. 
- **Data Strategy:** During prototyping, we use local JSON files in `src/assets/data/`.
- **Standards:** Use the Angular 21 `rxResource` API for data fetching. 
- **Pattern:** Prefer `inject(HttpClient)` and avoid manual `.subscribe()` calls in components. 
- **API Specifics:** In `rxResource`, use the `stream` property (not `loader`) to return the HttpClient Observable.
- **Example:** `adminTasks = rxResource({ stream: () => this.service.getData() });`
- **Reactivity:** All component data should be handled via Signals.
- **UI Components:** Use Material Table for lists and Chart.js for visualizations.

## Service Standards
- Every feature (Audit, Admin, User) must have its own dedicated service.
- Use the `inject()` function for dependency injection.
- Models must be defined as TypeScript `interfaces`.
- Mock data resides in `src/assets/data/`.

## Documentation Standards
- **Developer Log:** After every file modification or creation, you must update `developer_log.md`.
- **Log Format:** Use a bulleted list under a date heading.
- **Content:** Include the file changed, the reason for the change (e.g., "Migrated to rxResource"), and the result of the build/test if applicable.
- **Persistence:** Never overwrite the entire log; always append or prepend the latest entry.

### Architecture
- Shell Integration: When creating a new feature component (e.g., Admin, User), automatically update the AuditReportComponent (the shell) to include the new component's selector in the appropriate tab or section.
- Selector Naming: All selectors must follow the app- prefix convention.