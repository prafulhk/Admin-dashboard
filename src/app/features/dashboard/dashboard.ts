import { Component } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { Table } from '../../shared/components/table/table';
import { Modal } from '../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';
import { Charts } from '../../shared/components/charts/charts';
import { ToastService } from '../../core/services/toast-service';
import { Toast } from '../../shared/components/toast/toast/toast';
import { Skeleton } from '../../shared/components/skeleton/skeleton';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../../core/services/user-service';

@Component({
  selector: 'app-dashboard',
  imports: [Card, Table, Modal, FormsModule, Charts, Toast, Skeleton, CommonModule],
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
  // users = [
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'Admin',
  //     status: 'Active',
  //   },
  //   {
  //     name: 'Jane Smith',
  //     email: 'jane@example.com',
  //     role: 'Editor',
  //     status: 'Pending',
  //   },
  //   {
  //     name: 'David Lee',
  //     email: 'david@example.com',
  //     role: 'User',
  //     status: 'Active',
  //   },
  // ];

  newUser = {
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  };
  users: User[] = [];

  constructor(
    private toast: ToastService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);

    this.users = this.userService.getUsers();
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
      this.userService.updateUser(this.editIndex, this.newUser);
      this.toast.show('User Updated');
    } else {
      this.userService.addUser(this.newUser);
      this.toast.show('User Added');
    }

    this.users = this.userService.getUsers();

    this.closeModal();
  }

  confirmDelete(index: number) {
    this.deleteIndex = index;
    this.isDeleteModalOpen = true;
  }

  deleteUser() {
    this.userService.deleteUser(this.deleteIndex);

    this.users = this.userService.getUsers();

    this.isDeleteModalOpen = false;
    this.toast.show('User Deleted');
  }

  getRoleStats() {
    const roles: any = {
      Admin: 0,
      Editor: 0,
      User: 0,
    };

    this.users.forEach((user) => {
      roles[user.role]++;
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

  get filteredUsers() {
    if (!this.searchText) {
      return this.users;
    }

    const search = this.searchText.toLowerCase();

    return this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.role.toLowerCase().includes(search) ||
        user.status.toLowerCase().includes(search),
    );
  }
}
