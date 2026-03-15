import { Component } from '@angular/core';
import { ToastService } from '../../../../core/services/toast-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [AsyncPipe],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  message = '';
  show = false;

  constructor(public toastService: ToastService) {
    this.toastService.message$.subscribe((msg) => {
      this.message = msg;
    });

    this.toastService.visible$.subscribe((state) => {
      this.show = state;
    });
  }
}
