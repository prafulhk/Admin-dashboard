import { Component, Input } from '@angular/core';
import { LayoutService } from '../../core/services/layout-service';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
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
