import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { CreateUserService } from '../../services/users/create-user.service';
import { CreateUserRequestDTO } from '../../dto';
import { ERROR_MAP } from '../../utils/error-map';
import { NotificationService } from '../../services/utils/notification.service';
import { NavigationService } from '../../services/utils/navigation.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  model: CreateUserRequestDTO = {
    email: '',
    password: '',
    name: '',
    username: '',
    phone: '',
    birthday: '',
    countryId: '',
    twoFactorEnabled: false,
    refreshTokenEnabled: false,
    theme: 'LIGHT',
    rolesName: ['user'],
  };
  rolesInput: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private users: CreateUserService,
    private notify: NotificationService,
    private navigation: NavigationService
  ) {}

  onBirthdayChange(date: Date) {
    if (date) {
      // Define em yyyy-MM-dd
      const yyyy = date.getFullYear();
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const dd = date.getDate().toString().padStart(2, '0');
      this.model.birthday = `${yyyy}-${mm}-${dd}`;
    }
  }

  updateRoles() {
    if (this.rolesInput) {
      this.model.rolesName = this.rolesInput.split(',').map(r => r.trim()).filter(Boolean);
    } else {
      this.model.rolesName = [];
    }
  }

  goLogin() {
    this.navigation.goLogin();
  }

  onSubmit(): void {
    // Aqui você pode adicionar validações de campos se precisar!
    this.isLoading = true;
    this.errorMessage = null;
    this.users.createUser(this.model)
      .subscribe({
        next: () => {
          this.notify.success('Cadastro realizado com sucesso!');
        },
        error: (err) => {
          const backendError = err?.error?.error;
          const errorKey = backendError?.name;
          const errorObj = ERROR_MAP[errorKey];
          this.notify.error(errorObj?.message || 'Erro ao criar usuário.');
          this.errorMessage = `${errorObj?.key}: ${errorObj?.message}` || null;
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
  }
}
