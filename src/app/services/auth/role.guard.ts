import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    const payload = this.auth.getTokenPayload();

    if (!payload) {
      this.router.navigate(['/']);
      return false;
    }

    if (payload.roles.includes('USER')) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
