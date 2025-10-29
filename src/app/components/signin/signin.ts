import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';

import { Modal } from '../';
import { ERROR_MAP } from '../../utils/error-map';
import { NotificationService } from '../../services/utils/notification.service';
import { AuthValidationService } from '../../services/validation/auth-validation.service';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationService } from '../../services/utils/navigation.service';
import { ForgotPasswordRequestDTO, SignInRequestDTO } from '../../dto';

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
    MatDialogModule
],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class Signin {
  login: string = '';
  password: string = '';
  resetEmail: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @ViewChild('forgotPasswordBody') forgotPasswordBody!: TemplateRef<any>;
  @ViewChild('forgotPasswordActions') forgotPasswordActions!: TemplateRef<any>;

  constructor(
    private auth: AuthService,
    private authValidation: AuthValidationService,
    private navigation: NavigationService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {}

  openForgotPasswordModal() {
    this.dialog.open(Modal, {
      data: { title: 'Esqueceu a senha?', body: this.forgotPasswordBody, actions: this.forgotPasswordActions },
      width: '600px',
      autoFocus: false
    });
  }

  onSubmit(): void {
    const error = this.authValidation.validateSignInFields(this.login, this.password);
    if (error) {
      this.errorMessage = error;
      return this.notify.error(error);
    }

    this.isLoading = true;

    const data: SignInRequestDTO = {
      login: this.login,
      password: this.password
    };

    this.auth.login(data)
      .subscribe({
        next: (response) => {
          const token = response.data?.token;
          if (token) {
            this.auth.setToken(token);
            this.notify.success('Login realizado com sucesso!');
            this.navigation.goHome();
          } else {
            this.notify.error('Resposta inesperada do servidor.');
          }
        },
        error: (err) => {
          const backendError = err?.error?.error;
          const errorKey = backendError?.name;
          const errorObj = ERROR_MAP[errorKey];
          this.notify.error(errorObj?.message || 'Falha na autenticação.');
          this.errorMessage = `${errorObj?.key}: ${errorObj?.message}` || null;
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
  }

  onSubmitForgotPassword(dialogRef: any) {
    const error = this.authValidation.validateForgotPasswordEmail(this.resetEmail);
    if (error) return this.notify.error(error);

    dialogRef.componentInstance.isLoading = true;

    const data: ForgotPasswordRequestDTO = {
      email: this.resetEmail
    };

    this.auth.forgotPassword(data)
      .subscribe({
        next: () => {
          dialogRef.componentInstance.isLoading = false;
          dialogRef.close();
          this.notify.success('Se o email existir, você receberá um link para redefinir sua senha.');
        },
        error: () => {
          dialogRef.componentInstance.isLoading = false;
          this.notify.error('Erro ao enviar o email de recuperação.');
        }
      });
  }
}
