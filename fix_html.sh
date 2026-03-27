#!/bin/bash
sed -i 's/<\/div>$/  } @else {\n    <div class="loading-state">Loading actual data...<\/div>\n  }\n<\/div>/g' src/app/features/audit-report/components/andromeda-users/andromeda-users.component.html
