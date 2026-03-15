import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [FormsModule,CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() title = '';
  @Input() isOpen = false;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
