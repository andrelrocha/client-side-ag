import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Loader {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();
  private requestCounter = 0;

  show() {
    this.requestCounter++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.requestCounter--;
    if (this.requestCounter <= 0) {
      this.loadingSubject.next(false);
      this.requestCounter = 0;
    }
  }
}
