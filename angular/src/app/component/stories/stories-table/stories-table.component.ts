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

  openStory(story: Story) {
    console.log('Abrir conto', story);
  }

  deleteStory(id: number) {
    console.log('Excluir conto', id);
  }

  applyFilter(value: string) {
    console.log('Filtrar:', value);
  }
}