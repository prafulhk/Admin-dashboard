import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { Header } from './header/header';
import { Router, RouterOutlet } from '@angular/router';
import { Dashboard } from '../features/dashboard/dashboard';
import { LayoutService } from '../core/services/layout-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [Sidebar, Header, CommonModule, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  isOpen = true;
  isMobileSidebarOpen = false;

  menuItems = [
    {
      label: 'Dashboard',
      icon: '📊',
      route: '/dashboard',
    },
    {
      label: 'Users',
      icon: '👥',
      route: '/users',
    },
    {
      label: 'Settings',
      icon: '⚙',
      route: '/settings',
    },
  ];

  constructor(
    private layoutService: LayoutService,
    public router: Router,
  ) {
    this.layoutService.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  ngOnInit() {
    const savedState = localStorage.getItem('sidebar');

    if (savedState !== null) {
      this.isOpen = savedState === 'true';
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;

    localStorage.setItem('sidebar', String(this.isOpen));
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar() {
    this.isMobileSidebarOpen = false;
  }
}
