import { Component } from '@angular/core';
import { Auth } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  login: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private auth: Auth, private router: Router) {}

  onSubmit(): void {
    this.auth.login(this.login, this.password).subscribe({
      next: (response) => {
        const token = response?.data?.token;
        if (token) {
          this.auth.setToken(token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login inválido.';
        }
      },
      error: () => {
        this.errorMessage = 'Erro ao autenticar. Verifique suas credenciais.';
      }
    });
  }
}
