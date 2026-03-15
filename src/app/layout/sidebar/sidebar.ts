import { Component, Input } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  templateUrl: './sidebar.html',
})
export class Sidebar {
  isOpen = true;
  @Input() isMobileOpen = false;
  constructor(
    private layout: LayoutService,
    public router: Router,
  ) {
    this.layout.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }
}
