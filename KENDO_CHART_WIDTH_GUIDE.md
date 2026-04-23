# Kendo UI Chart Width Management (v17 & v23)

This guide outlines the best practices for adjusting the width of Kendo UI charts across different versions (v17 and v23) without relying on fragile CSS overrides like `::ng-deep`.

## 1. The Recommended Kendo API Approach
Using the Kendo API is superior to CSS because it ensures the chart's internal layout engine (labels, legends, and animations) recalculates correctly based on the new dimensions.

### Template-Driven (Best for v23)
Use the `kendo-chart-area` component to define the width and remove internal margins that might be "squeezing" your chart.

```html
<kendo-chart class="chart-container-donut">
  <!-- Use width to set fixed pixels, or omit for 100% container width -->
  <!-- Set margin to 0 to let the chart (especially donuts) fill the space -->
  <kendo-chart-area 
    [width]="450" 
    [margin]="0" 
    background="transparent">
  </kendo-chart-area>
  
  <kendo-chart-series>
     <kendo-chart-series-item type="donut" [data]="data"></kendo-chart-series-item>
  </kendo-chart-series>
</kendo-chart>
```

### Property-Binding (Best for v17)
In older versions, binding a configuration object to the `[chartArea]` input can be more reliable for triggering refreshes.

**Component (TypeScript):**
```typescript
public auditChartArea = {
    width: 450,
    margin: 0,
    background: 'transparent'
};
```

**Template (HTML):**
```html
<kendo-chart [chartArea]="auditChartArea">
    <!-- ... -->
</kendo-chart>
```

---

## 2. Dependencies & Imports
You do **not** need to install additional packages. Both the template tags and the configuration objects are included in the standard `ChartModule`.

```typescript
import { ChartModule } from '@progress/kendo-angular-charts';

@Component({
  standalone: true,
  imports: [ChartModule, ...],
  // ...
})
```

---

## 3. Why Avoid `::ng-deep`?
While `::ng-deep .k-chart-surface svg { width: 100% !important; }` physically stretches the container, it often causes:
1. **Blurry Charts**: The SVG is stretched like a bitmap rather than being re-rendered at the correct scale.
2. **Clipping**: Labels and legends may disappear because the chart's logic still thinks it is rendered in the smaller original space.
3. **Inconsistency**: Styles might leak or fail to apply across different versions of Kendo's internal DOM structure.

---

## 4. Troubleshooting Layout Issues
If the chart still doesn't fill the parent `div.col-md-4`, check these two items:

1. **Host Display**: Ensure your custom CSS class sets the chart host to `display: block`.
   ```scss
   .chart-container-donut {
     display: block;
     height: 230px; // A height must be defined for the chart to render
   }
   ```

2. **Manual Resize**: If the chart is in a tab, modal, or flexbox container that renders after the chart initializes, call the `resize()` method:
   ```typescript
   @ViewChild(ChartComponent) public chart: ChartComponent;

   ngAfterViewInit() {
     setTimeout(() => this.chart.resize(), 100);
   }
   ```

## 5. Adding Tooltips
To display values on hover (for both Bar and Donut charts), add the `kendo-chart-tooltip` component inside the main chart tag.

### Basic Tooltip
```html
<kendo-chart-tooltip [visible]="true"></kendo-chart-tooltip>
```

### Advanced Styling (Compatible with v17)
If the default tooltips look cramped or lack styling (no padding/shadows), you can use a custom template. This allows you to use standard Bootstrap classes or inline styles to give it a professional look.

```html
<kendo-chart-tooltip [visible]="true" background="#ffffff" [border]="{ color: '#eee', width: 1 }">
  <ng-template kendoChartSeriesTooltipTemplate let-value="value" let-category="category">
    <div class="p-2 shadow-sm rounded border-0 text-center" style="min-width: 80px;">
      <div class="extra-small text-muted text-uppercase fw-bold mb-1">{{ category }}</div>
      <div class="h6 fw-bold mb-0">{{ value }}</div>
    </div>
  </ng-template>
</kendo-chart-tooltip>
```

**Why use a template?**
*   **Total Control**: You can use `padding`, `border-radius`, and `box-shadow` which the base API doesn't always expose cleanly in older versions.
*   **Semantic Data**: You can include categories or other context (e.g., "Active: 45 users") rather than just a raw number.
*   **HTML Support**: You can use complex HTML (images, icons, bold text) inside the tooltip.
