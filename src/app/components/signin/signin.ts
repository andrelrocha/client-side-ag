import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class Signin {
  login = '';
  password = '';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private authService: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.isLoading = true;

    this.authService.login(this.login, this.password).subscribe({
      next: (response) => {
        const token = response?.data?.token;
        if (token) {
          this.authService.setToken(token);
          this.router.navigate(['/home']);
        } else {
          this.showError('Resposta inesperada do servidor.');
        }
      },
      error: (err) => {
        const backendError = err?.error?.error;
        if (backendError?.name && backendError?.message) {
          this.showError(`${backendError.name}: ${backendError.message}`);
        } else {
          this.showError('Falha na autenticação. Tente novamente.');
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
