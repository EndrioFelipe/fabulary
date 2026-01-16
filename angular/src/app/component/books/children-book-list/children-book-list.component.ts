import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
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
import { BookFilter } from 'src/app/core/filters/book-filter';

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
  activeFilters: BookFilter = {};

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



   //@note PAI apply filter
  applyFilterPai(filtersReceived: Record<string, any>) {
    console.log('filtersReceived')
    console.log(filtersReceived)

  //  Essa função recebe um objeto "genérico" com filtros vindos do componente filho.
  // Record<string, any> significa:
  // - chaves (keys) são strings ("title", "authorName", etc)
  // - valores podem ser qualquer coisa (string, number, etc)
  //
  // Exemplo de filtersReceived:
  // {
  //   title: "Alice",
  //   value: "19.90",        <-- vem como string do <input>
  //   ageRange: "SIX_TO_EIGHT"
  // }

  const filter: BookFilter = {
    title: filtersReceived['title'], //->//  Pega o filtro "title" do objeto recebido. // Se não tiver "title", isso vira undefined (porque não existe a chave).
    authorName: filtersReceived['authorName'], //-> Pega "authorName"
    //  Aqui é o mais importante:
    // - input number no HTML muitas vezes chega como STRING ("12", "19.90")
    // - o backend normalmente espera NUMBER
    //
    // Então: se tiver algo preenchido em value, converte com Number(...)
    // Senão, manda undefined (não filtra por valor)
    value: filtersReceived['value']
      ? Number(filtersReceived['value'])
      : undefined,

    //  ageRange é string mesmo (ex: "THREE_TO_FIVE")
    // então pode mandar direto.
    ageRange: filtersReceived['ageRange']
  };

  //  Agora chama o service passando o filtro no formato certo pro backend.
  // Esse método getFiltered(filter) deve montar query params e fazer GET/POST.
  //@note SERVICE do filtro do PAI
  this.childrenBookService.getFiltered(filter).subscribe({
    //  Se deu certo (backend respondeu), "books" é a lista filtrada.
    next: (books) => {
      //  Atualiza a lista que o componente mostra na tela.
      this.childrenBooks = books;
    },

    //  Se deu erro (backend caiu, 500, timeout, etc)
    error: (err) => {
      //  Mostra o erro no console pra debug
      console.error('Erro ao filtrar livros:', err);

      //  Mostra uma notificação visual pro usuário
      this.snackBar.open('Erro ao filtrar livros!', 'Fechar', {
        duration: 3000,                 // fica 3 segundos
        horizontalPosition: 'center',   // centralizado
        verticalPosition: 'top',        // no topo
        panelClass: 'snackbar-error'    // CSS classe de estilo
      });
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
