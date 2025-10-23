import { Routes } from '@angular/router';
import { Home, Signin } from './components';

export const routes: Routes = [
  { path: '', component: Signin },
  { path: 'home', component: Home }
];
