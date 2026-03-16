import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  initTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
