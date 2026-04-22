# Donut Chart Label Update

This document outlines the changes made to the "Total Status Breakdown" donut chart in the Andromeda Users dashboard to replace the legend with detailed, multi-line labels.

## Changes Overview

### 1. Component Logic Update
In `andromeda-users.component.ts`, a new `labelContent` method was implemented to handle the formatting of the chart labels. This method dynamically calculates the percentage relative to the total users across all statuses.

- **File**: `src/app/features/audit-report/components/andromeda-users/andromeda-users.component.ts`
- **Logic**:
  - Extracts the raw count from the `dataItem`.
  - Calculates the total by summing the values of all series data points.
  - Returns a formatted string with newlines (`\n`) for multi-line display.

### 2. Template Configuration
The HTML template was updated to link the chart labels to the new formatting function and hide the redundant legend.

- **File**: `src/app/features/audit-report/components/andromeda-users/andromeda-users.component.html`
- **Updates**:
  - `[content]="labelContent"`: Applied the custom formatter to the series labels.
  - `position="outsideEnd"`: Ensured labels are placed outside the chart for readability.
  - `[visible]="false"`: Hidden the `kendo-chart-legend` component.

## Detailed Label Format

The labels now display data in three lines next to the corresponding slice:

1.  **Count**: The absolute number of users for that status (e.g., `132 users`).
2.  **Percentage**: The calculated percentage of the total status breakdown, formatted to one decimal place (e.g., `13.2%`).
3.  **Category**: The status name (e.g., `Active`, `Pending`, `Inactive`, or `Terminated`).

## Verification
The implementation was verified against the project's data schema in `src/assets/data/audit-report.json`, ensuring the total (1002) and individual counts (e.g., 132 for Terminated) result in the correct percentages.
