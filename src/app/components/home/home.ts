import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  userEmail: string | null = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.userEmail = this.auth.getTokenPayload()?.sub || 'Email não encontrado';
  }

  listarJogos() {
    // Por enquanto, não faz nada
    console.log('Listar jogos clicado!');
  }
}
