import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Auth } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): boolean {
    return this._validateRole();
  }

  canActivateChild(): boolean {
    return this._validateRole();
  }

  private _validateRole(): boolean {
    const payload = this.auth.getTokenPayload();

    if (!payload || !payload.roles.includes('USER')) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
