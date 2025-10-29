import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/logged/home']);
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  goTo(path: string[]): void {
    this.router.navigate(path);
  }
}
