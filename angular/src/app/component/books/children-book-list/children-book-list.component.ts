import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Book } from 'src/app/core/models/book.model';
import { ChildrenBookService } from 'src/app/core/services/children-book.service';
import { BooksTableComponent } from '../books-table/books-table.component';
import { AgeRange } from 'src/app/core/enums/age-range';

@Component({
  selector: 'app-children-book-list',
  templateUrl: 
  './children-book-list.component.html',
  styleUrls: ['./children-book-list.component.css'],
  standalone: true,
  imports: [CommonModule, 
      MatSnackBarModule,
      RouterModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatGridListModule,
      MatCardModule,
      MatIconModule,
      BooksTableComponent
    ],
})
export class ChildrenBookListComponent {

  showTable = true;
  childrenBooks: Book[] = [];
  
  loading = false;
  error: string | null = null;

    constructor(private childrenBookService: ChildrenBookService, private router: Router, private snackBar: MatSnackBar 
    ) {}

  createBook(): void {
    this.router.navigate(['/books/new']);
  }

  ngOnInit(): void {
    this.loadChildrenBook();
  }

  loadChildrenBook(): void {
    this.loading = true;
    this.error = null;

    this.childrenBookService.getAll().subscribe({
      next: (data) => {
        this.childrenBooks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os contos:', err);
        this.error = 'Não foi possível carregar os contos.';
        this.loading = false;
      }
    });
  }

  openStory(story: Book): void {
    this.router.navigate(['/stories/read', story.id]);
  }

  createStory(): void {
    this.router.navigate(['/stories/new']);
  }

  deleteStory(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este conto?')) {
      return;
    }

    this.childrenBookService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Conto excluído com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success'
        });
        this.loadChildrenBook(); 
      },
      error: (err) => {
        console.error('Erro ao excluir conto:', err);
        this.snackBar.open('Erro ao excluir o conto!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-error'
        });
      }
    });

  }
}
