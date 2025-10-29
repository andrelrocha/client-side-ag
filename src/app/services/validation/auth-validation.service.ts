import { Injectable } from '@angular/core';
import { SignInRequestDTO } from '../../dto';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {
  public validateSignInFields(data: SignInRequestDTO): string | null {
    const errors: string[] = [];
    if (!data.login?.trim()) errors.push("Campo 'Email ou Login' é obrigatório.");
    if (!data.password?.trim()) errors.push("Campo 'Senha' é obrigatório.");
    return errors.length ? errors.join('\n') : null;
  }

  public validateForgotPasswordEmail(email: string): string | null {
    if (!email?.trim()) {
      return "Campo 'Email' é obrigatório para o envio do email de recuperação de senha.";
    }
    return null;
  }
}
