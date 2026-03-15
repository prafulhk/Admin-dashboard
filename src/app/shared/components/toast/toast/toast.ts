
import { Component } from '@angular/core';
import { ToastService } from '../../../../core/services/toast-service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  message = '';
  show = false;

  constructor(private toastService: ToastService) {
    this.toastService.message$.subscribe((msg) => {
      this.message = msg;
    });

    this.toastService.visible$.subscribe((state) => {
      this.show = state;
    });
  }
}
