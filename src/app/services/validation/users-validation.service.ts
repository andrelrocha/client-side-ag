import { Injectable } from '@angular/core';
import { CreateUserRequestDTO } from '../../dto';

@Injectable({ providedIn: 'root' })
export class UsersValidationService {
  validateFields(data: CreateUserRequestDTO): string | null {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      return "Informe um e-mail válido.";

    if (!data.password || data.password.length < 8)
      return "A senha deve ter ao menos 8 caracteres.";

    if (!/[A-Z]/.test(data.password) || !/\d/.test(data.password))
      return "A senha deve conter ao menos uma letra maiúscula e um número.";

    if (!data.name || data.name.trim().length === 0)
      return "O nome é obrigatório.";

    if (!data.username || data.username.length > 20)
      return "O nome de usuário deve ter até 20 caracteres.";

    if (!data.phone || !/^\(\d{2,3}\)\d{5}-\d{4}$/.test(data.phone))
      return "Telefone deve seguir o padrão (99)99999-9999.";

    if (!data.birthday || !/^\d{4}-\d{2}-\d{2}$/.test(data.birthday))
      return "A data de nascimento deve estar no formato DD/MM/YYYY.";

    if (!data.countryId)
      return "País é obrigatório.";

    if (!data.rolesName || data.rolesName.some(r => !r.trim()))
      return "Informe pelo menos um papel válido para o usuário.";

    return null;
  }
}
