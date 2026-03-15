import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

  private visibleSource = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSource.asObservable();

  show(message: string) {
    this.messageSource.next(message);
    this.visibleSource.next(true);

    setTimeout(() => {
      this.visibleSource.next(false);
    }, 2000);
  }
}
