import { Routes } from '@angular/router';
import { Home, Signin } from './components';
import { RoleGuard } from './services/auth/role.guard';

export const routes: Routes = [
  { path: '', component: Signin },
  { path: 'home', component: Home, canActivate: [RoleGuard] }
];
