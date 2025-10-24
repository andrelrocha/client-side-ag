import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Loader as LoaderService } from '../../../services/utils/loader.service';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-bar.html',
  styles: [`
    .loading-bar {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: #007bff;
      animation: loading 2s linear infinite;
      z-index: 9999;
    }
    @keyframes loading {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `]
})
export class LoadingBar {
  isLoading;

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading$;
  }
}
