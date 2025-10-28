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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';

import { Modal } from '../index';

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
    MatDialogModule
],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class Signin {
  login = '';
  password = '';
  isLoading = false;
  errorMessage: string | null = null;
  resetEmail = '';

  @ViewChild('forgotPasswordBody') forgotPasswordBody!: TemplateRef<any>;
  @ViewChild('forgotPasswordActions') forgotPasswordActions!: TemplateRef<any>;

  constructor(
    private authService: Auth,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openForgotPasswordModal() {
    this.dialog.open(Modal, {
      data: {
        title: 'Esqueceu a senha?',
        body: this.forgotPasswordBody,
        actions: this.forgotPasswordActions,
      },
      width: '600px',
      autoFocus: false
    });
  }
  onSubmitForgotPassword(dialogRef: any) {
    if (!this.resetEmail) { return; }
    // Aqui, envie a solicitação de recuperação
    // Exemplo de loading e mock de sucesso:
    dialogRef.disableClose = true;
    dialogRef.componentInstance.isLoading = true;

    setTimeout(() => {
      dialogRef.componentInstance.isLoading = false;
      dialogRef.close();
      this.snackBar.open('E-mail de recuperação enviado!', 'Fechar', {
        duration: 4000, verticalPosition: 'top', panelClass: ['success-snackbar']
      });
    }, 2000);
  }

  validateFields(): string | null {
    const errors: string[] = [];
    if (!this.login || this.login.trim().length === 0) {
      errors.push("Campo 'Email ou Login' é obrigatório.");
    }
    if (!this.password || this.password.trim().length === 0) {
      errors.push("Campo 'Senha' é obrigatório.");
    }

    if (errors.length) {
      return errors.join('\n');
    }
    return null;
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.isLoading = true;

    const validationError = this.validateFields();

    if (validationError) {
      this.showError(validationError);
      return;
    }

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
