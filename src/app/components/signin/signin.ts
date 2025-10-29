import { Component, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Modal } from '../';
import { ERROR_MAP } from '../../utils/error-map';
import { NotificationService } from '../../services/utils/notification.service';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationService } from '../../services/utils/navigation.service';
import { ForgotPasswordRequestDTO, SignInRequestDTO } from '../../dto';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './signin.html',
  styleUrls: ['./signin.scss']
})
export class Signin {
  form: FormGroup;
  forgotPasswordForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  @ViewChild('forgotPasswordBody') forgotPasswordBody!: TemplateRef<any>;
  @ViewChild('forgotPasswordActions') forgotPasswordActions!: TemplateRef<any>;

  constructor(
    private auth: AuthService,
    private navigation: NavigationService,
    private dialog: MatDialog,
    private notify: NotificationService
  ) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get login() { return this.form.get('login'); }
  get password() { return this.form.get('password'); }
  get forgotEmail() { return this.forgotPasswordForm.get('email'); }

  openForgotPasswordModal() {
    this.dialog.open(Modal, {
      data: { title: 'Esqueceu a senha?', body: this.forgotPasswordBody, actions: this.forgotPasswordActions },
      width: '600px',
      autoFocus: false
    });
  }

  goToSignUp(): void {
    this.navigation.goSignup();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.error('Preencha todos os campos corretamente.');
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.auth.login(this.form.value as SignInRequestDTO).subscribe({
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
      complete: () => (this.isLoading = false)
    });
  }

  onSubmitForgotPassword(dialogRef: any) {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return this.notify.error("Preencha um email válido para recuperação de senha.");
    }

    dialogRef.componentInstance.isLoading = true;

    this.auth.forgotPassword(this.forgotPasswordForm.value as ForgotPasswordRequestDTO)
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
