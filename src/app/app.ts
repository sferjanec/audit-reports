import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // Required for <router-outlet>
    RouterLink,        // Required for [routerLink]
    RouterLinkActive   // Required for [routerLinkActive]
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'audit-dashboard';
}
