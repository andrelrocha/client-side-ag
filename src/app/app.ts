import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBar } from './components/utils/loading-bar/loading-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular-app');
}
