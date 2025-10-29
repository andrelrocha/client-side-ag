import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {
  public validateSignInFields(login: string, password: string): string | null {
    const errors: string[] = [];
    if (!login?.trim()) errors.push("Campo 'Email ou Login' é obrigatório.");
    if (!password?.trim()) errors.push("Campo 'Senha' é obrigatório.");
    return errors.length ? errors.join('\n') : null;
  }

  public validateForgotPasswordEmail(email: string): string | null {
    if (!email?.trim()) {
      return "Campo 'Email' é obrigatório para o envio do email de recuperação de senha.";
    }
    return null;
  }
}
