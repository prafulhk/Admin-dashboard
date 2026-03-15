import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() showActions = false;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  currentPage = 1;
  itemsPerPage = 5;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const valueA = a[column.toLowerCase()];
      const valueB = b[column.toLowerCase()];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;

      return 0;
    });
  }
}
