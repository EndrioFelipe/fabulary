import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, DoCheck {

  @Input() title: string = '';
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
  @Input() filterLabel: string = 'Filtrar itens';
  @Input() pageSizeOptions = [5, 10, 25];
  @Input() pageSize = 5;

  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() filter = new EventEmitter<string>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  currentPage = 0;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.displayedColumns = [...this.columns.map(c => c.field), 'actions'];
    this.dataSource = new MatTableDataSource(this.data.slice(this.startIndex, this.endIndex));
  }

  ngDoCheck() {
    this.dataSource.data = this.data.slice(this.startIndex, this.endIndex);
  }

  get totalItems() {
    return this.data.length;
  }

  get startIndex() {
    return this.currentPage * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  updatePageSize() {
    this.currentPage = 0;
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalItems) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  firstPage() {
    this.currentPage = 0;
  }

  lastPage() {
    this.currentPage = Math.floor((this.totalItems - 1) / this.pageSize);
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter.emit(value);
  }

  handleView(item: any) {
    this.view.emit(item);
  }

  handleDelete(item: any) {
    this.delete.emit(item);
  }
}