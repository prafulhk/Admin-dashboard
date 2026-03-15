import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface User {
  name: string;
  email: string;
  role: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending' },
    { name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Active' },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(500)); // simulate API delay
  }

  addUser(user: User) {
    this.users.push(user);
  }

  updateUser(index: number, user: User) {
    this.users[index] = user;
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }
}
