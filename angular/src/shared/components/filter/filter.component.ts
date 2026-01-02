import { Component, Input, Output, EventEmitter, ViewChild, OnInit, DoCheck } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() title: string = '';
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
  @Input() filters: {
    label: string;
    field: string;
    type?: 'text' | 'select' | 'date' | 'number';
    options?: string[];
  }[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>(); 
  @Output() filter = new EventEmitter<{ field: string; value: string }>();

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  currentPage = 0;

  @ViewChild(MatSort) sort!: MatSort;

  
  ngOnInit() {
  }



  handleView(item: any) {
    this.view.emit(item);
  }

  handleDelete(item: any) {
    this.delete.emit(item);
  }

  onFilterChange(field: string, event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.filter.emit({ field, value });
  }
}