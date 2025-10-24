import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  login = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: Auth, private router: Router) {}

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.login, this.password).subscribe({
      next: (response) => {
        const token = response?.data?.token;
        if (token) {
          this.authService.setToken(token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Unexpected response format.';
        }
      },
      error: (err) => {
        const backendError = err?.error?.error;

        if (backendError?.name && backendError?.message) {
          this.errorMessage = `${backendError.name}: ${backendError.message}`;
        } else {
          this.errorMessage = 'Authentication failed. Please try again.';
        }

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
