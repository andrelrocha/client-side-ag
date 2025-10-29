import { Routes } from '@angular/router';
import { Home, Signin, Signup } from './components';
import { RoleGuard } from './services/auth/role.guard.service';

export const routes: Routes = [
  { path: '', component: Signin },
  { path: 'signup', component: Signup },
  {
    path: 'logged',
    canActivateChild: [RoleGuard],
    children: [
      { path: 'home', component: Home }
    ]
  }
];
