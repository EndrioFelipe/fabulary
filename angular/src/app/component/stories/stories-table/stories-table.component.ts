import { Component, Input } from '@angular/core';
import { Story } from '../../../core/models/story.model';
import { DataTableComponent } from 'src/shared/components/data-table/data-table.component';
import { StoriesService } from 'src/app/core/services/stories.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stories-table',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.css']
})
export class StoriesTableComponent {
  @Input() stories: Story[] = [];

  constructor(private storiesService: StoriesService, private snackBar: MatSnackBar  ) {}

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'title', header: 'Título' },
    { field: 'excerpt', header: 'Resumo' }
  ];

  filters: { field: string; label: string; type?: 'text' | 'select' | 'date'; options?: string[] }[] = [
    { field: 'title', label: 'Título', type: 'text' },
    { field: 'excerpt', label: 'Resumo', type: 'text' },
  ];

  applyFilter(event: { field: string; value: string }) {
    const { field, value } = event;
    console.log(`Filtrar por ${field}: ${value}`);
  }

  openStory(story: Story) { console.log('Abrir conto', story);}
  deleteStory(id: number) { 
if (!confirm('Tem certeza que deseja excluir este conto?')) {
      return;
    }

    this.storiesService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Conto excluído com sucesso!', 'Fechar', {
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