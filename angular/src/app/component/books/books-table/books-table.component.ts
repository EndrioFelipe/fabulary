import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenBookService } from 'src/app/core/services/children-book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/core/models/book.model';
import { DataTableComponent } from 'src/shared/components/data-table/data-table.component';
import { FilterComponent } from 'src/shared/components/filter/filter.component';

@Component({
  selector: 'app-books-table',
  standalone: true,
  imports: [DataTableComponent, FilterComponent],
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent {
  @Input() childrenBooks: Book[] = [];
  @Output() refresh = new EventEmitter<void>();

  constructor(private childrenBookService: ChildrenBookService, private snackBar: MatSnackBar){}

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Título' },
    { field: 'authorName', header: 'Nome do Autor' },
    { field: 'value', header: 'Valor' },
    { field: 'ageRange', header: 'Faixa Etária' }
  ];

  filters: { field: string; label: string; type?: 'text' | 'select' | 'date' | 'number'; options?: string[] }[] = [
    { field: 'title', label: 'Título', type: 'text' },
    { field: 'value', label: 'Valor', type: 'number' },
    { field: 'authorName', label: 'Nome do Autor', type: 'text' },
    { field: 'ageRange', label: 'Faixa Etária', type: 'select' },
  ];

  applyFilter(event: { field: string; value: string }) {
    const { field, value } = event;
    console.log(`Filtrar por ${field}: ${value}`);
  }

  openChildrenBook(book: Book) { console.log('Abrir livro', book); }
  deleteChildrenBook(book: Book) {
    const id = book.id;
    if (!confirm('Tem certeza que deseja excluir este livro?')) {
      return;
    }

    this.childrenBookService.delete(id).subscribe({
      next: () => {
        this.refresh.emit();
        this.snackBar.open('Livro excluído com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'snackbar-success'
        });
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
