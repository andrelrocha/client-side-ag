import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth/auth.service';
import { GamesService } from '../../services/games/games.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  styleUrls: ['./home.scss'],
})
export class Home {
  userEmail: string | null = '';

  constructor(
    private auth: AuthService,
    private gamesService: GamesService
  ) {}

  ngOnInit() {
    this.userEmail = this.auth.getTokenPayload()?.sub || 'Email não encontrado';
  }

  listarJogos() {
    this.gamesService.getGames(0, 20, 'name', 'asc', undefined, 'elden', 1980, 2025).subscribe({
      next: data => console.log(data)
    });
  }
}
