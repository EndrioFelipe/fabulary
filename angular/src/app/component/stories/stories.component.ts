import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesService } from '../../core/services/stories.service';
import { Story } from '../../core/models/story.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories: Story[] = [];
  loading = false;
  error: string | null = null;

  constructor(private storiesService: StoriesService, private router: Router,
     private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.loadStories();
  }

  loadStories(): void {
    this.loading = true;
    this.error = null;

    this.storiesService.getAll().subscribe({
      next: (data) => {
        this.stories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os contos:', err);
        this.error = 'Não foi possível carregar os contos.';
        this.loading = false;
      }
    });
  }

  openStory(story: Story): void {
    alert(`Abrindo: ${story.title}`);
  }

  createStory(): void {
    this.router.navigate(['/stories/new']);
  }

  deleteStory(id: number): void {
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
        this.loadStories(); // recarrega lista
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