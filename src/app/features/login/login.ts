import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.email && this.password) {
      localStorage.setItem('token', 'demo');

      this.router.navigate(['/dashboard']);
    }
  }
}
