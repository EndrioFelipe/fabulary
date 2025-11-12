import { Component, Input } from '@angular/core';
import { Story } from '../../../core/models/story.model';
import { DataTableComponent } from 'src/shared/components/data-table/data-table.component';

@Component({
  selector: 'app-stories-table',
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.css']
})
export class StoriesTableComponent {
  @Input() stories: Story[] = [];

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

  openStory(story: Story) { console.log('Abrir conto', story); }
  deleteStory(id: number) { console.log('Excluir conto', id); }
}