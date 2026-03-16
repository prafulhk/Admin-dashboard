import { Component, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = 'Dashboard';
  @Output() toggleMobileSidebar = new EventEmitter<void>();
  constructor(
    private layout: LayoutService,
    public router: Router,
    private theme: ThemeService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url.includes('dashboard')) {
          this.title = 'Dashboard';
        }

        if (url.includes('users')) {
          this.title = 'Users';
        }

        if (url.includes('settings')) {
          this.title = 'Settings';
        }
      }
    });
  }

  toggleSidebar() {
    this.layout.toggleSidebar();
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
