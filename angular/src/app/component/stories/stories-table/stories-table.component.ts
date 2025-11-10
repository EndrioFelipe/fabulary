import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Story } from '../../../core/models/story.model';

@Component({
  selector: 'app-stories-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.css']
})
export class StoriesTableComponent implements OnInit {
  @Input() stories: Story[] = [];

  displayedColumns: string[] = ['id', 'title', 'excerpt', 'actions'];
  dataSource!: MatTableDataSource<Story>;

  @ViewChild(MatSort) sort!: MatSort;

  pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  currentPage = 0;

  get totalItems() {
    return this.stories.length;
  }

  get startIndex() {
    return this.currentPage * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.stories.slice(this.startIndex, this.endIndex));
  }

  ngDoCheck() {
    this.dataSource.data = this.stories.slice(this.startIndex, this.endIndex);
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
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    const filtered = this.stories.filter(s =>
      s.title.toLowerCase().includes(filterValue) ||
      s.excerpt?.toLowerCase().includes(filterValue)
    );
    this.dataSource.data = filtered.slice(this.startIndex, this.endIndex);
  }

  deleteStory(id: number) {
    console.log('Excluir conto', id);
  }

  openStory(story: Story) {
    console.log('Abrir conto', story);
  }
}