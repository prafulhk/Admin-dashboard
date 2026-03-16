import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}
  private users: User[] = [
    // { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    // { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Pending' },
    // { name: 'Praful Lee', email: 'david@example.com', role: 'User', status: 'Active' },
  ];

  // getUsers(): Observable<User[]> {
  //   return of([...this.users]).pipe(delay(500)); // simulate API delay
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/users');
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
