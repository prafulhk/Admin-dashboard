import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard-guard';
import { Dashboard } from './features/dashboard/dashboard';
import { Settings } from './features/settings/settings';
import { Users } from './features/users/users';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: Dashboard },
      { path: 'users', component: Users },
      { path: 'settings', component: Settings },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
