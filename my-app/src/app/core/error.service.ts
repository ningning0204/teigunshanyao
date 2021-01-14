import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public hasError = new BehaviorSubject<string>('');

  constructor() { }

  showDialog(message) {
    this.hasError.next(message);
  }

  dismiss() {
    this.hasError.next('');
  }
}
