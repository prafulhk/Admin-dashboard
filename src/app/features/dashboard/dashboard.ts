import { Component, ChangeDetectorRef } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Table } from '../../shared/components/table/table';
import { Modal } from '../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';
import { Charts } from '../../shared/components/charts/charts';
import { ToastService } from '../../core/services/toast-service';
import { Toast } from '../../shared/components/toast/toast/toast';
import { Skeleton } from '../../shared/components/skeleton/skeleton';

import { User } from '../../core/services/user-service';
import { Store } from '@ngrx/store';
import { addUser, loadUsers, deleteUser, updateUser } from '../../store/users/users.actions';
import { selectAllUsers } from '../../store/users/users.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Table, Modal, FormsModule, Charts, Toast, Skeleton],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isModalOpen = false;
  isEditMode = false;
  editIndex = -1;
  deleteIndex = -1;
  isDeleteModalOpen = false;
  pieChartLabel = ['Admin', 'Editor', 'User'];
  lineChartLabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  toastTimer: any;
  columns = ['Name', 'Email', 'Role', 'Status'];
  searchText = '';
  isLoading = false;
  filteredUsers: User[] = [];
  roleChartData: number[] = [0, 0, 0];
  newUser = {
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  };
  users: User[] = [];

  constructor(
    private toast: ToastService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.store.dispatch(loadUsers());

    this.store.select(selectAllUsers).subscribe((users) => {
      this.users = users;
      console.log('this.users:', this.users);
      this.filteredUsers = users;
      this.roleChartData = this.calculateRoleStats(users);
      console.log(this.roleChartData);
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  openModal() {
    this.isEditMode = false;

    this.newUser = {
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
    };

    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editUser(user: any, index: number) {
    this.newUser = { ...user };

    this.isEditMode = true;
    this.editIndex = index;

    this.isModalOpen = true;
  }

  saveUser() {
    if (this.isEditMode) {
      this.store.dispatch(
        updateUser({
          index: this.editIndex,
          user: this.newUser,
        }),
      );

      this.toast.show('User Updated');
    } else {
      this.store.dispatch(addUser({ user: this.newUser }));
      this.toast.show('User Added');
    }

    this.closeModal();
  }

  confirmDelete(event: any) {
    this.deleteIndex = event.index;
    this.isDeleteModalOpen = true;
  }

  deleteUser() {
    this.store.dispatch(
      deleteUser({
        index: this.deleteIndex,
      }),
    );

    this.isDeleteModalOpen = false;
    this.toast.show('User Deleted');
  }

  calculateRoleStats(users: User[]) {
    const roles = { Admin: 0, Editor: 0, User: 0 };
    users.forEach((user) => {
      if (roles.hasOwnProperty(user.role)) {
        roles[user.role as keyof typeof roles]++;
      }
    });
    return [roles.Admin, roles.Editor, roles.User];
  }

  getTotalUsers() {
    return this.users.length;
  }

  getAdminCount() {
    return this.users.filter((user) => user.role === 'Admin').length;
  }

  getActiveUsers() {
    return this.users.filter((user) => user.status === 'Active').length;
  }

  onSearch() {
    const search = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.status.toLowerCase().includes(search),
    );
  }
}
