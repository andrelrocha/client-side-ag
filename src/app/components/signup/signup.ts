import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    ReactiveFormsModule
  ],
  providers: [provideNgxMask({
      dropSpecialCharacters: false
  })],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss']
})
export class Signup {
  signUpForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private users: CreateUserService,
    private notify: NotificationService,
    private navigation: NavigationService
  ) {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      phone: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      twoFactorEnabled: new FormControl(false),
      refreshTokenEnabled: new FormControl(false)
    });
  }

  get name() { return this.signUpForm.get('name'); }
  get username() { return this.signUpForm.get('username'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get phone() { return this.signUpForm.get('phone'); }
  get birthday() { return this.signUpForm.get('birthday'); }

  goLogin() {
    this.navigation.goLogin();
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return this.notify.error('Por favor, corrija os erros no cadastro.');
    }

    this.isLoading = true;
    this.errorMessage = null;

    const { birthday, phone, ...rest } = this.signUpForm.value;

    //formato yyyy-mm-dd
    const formattedBirthday = new Date(birthday).toISOString().split('T')[0];

    const simulatedData: CreateUserRequestDTO = {
      ...rest,
      phone: phone.replace(' ', ''),
      birthday: formattedBirthday,
      countryId: 'b8d9c92a-7a0b-4d2f-91cd-582f8c3478e4',
      theme: 'LIGHT',
      rolesName: ['USER'],
    };

    console.log('Simulated signup data:', simulatedData);

    /*
    this.users.createUser(simulatedData)
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.notify.success('Cadastro realizado com sucesso!');
          this.goLogin();
        },
        error: (err) => {
          const backendError = err?.error?.error;
          const errorKey = backendError?.name;
          const errorObj = ERROR_MAP[errorKey];
          this.notify.error(errorObj?.message || 'Erro ao criar usuário.');
          this.errorMessage = `${errorObj?.key}: ` + (errorObj?.message == null ? backendError?.message : errorObj?.message);
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      });
    */
  }
}
