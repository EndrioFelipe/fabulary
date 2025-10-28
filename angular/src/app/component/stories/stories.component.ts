import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesService } from '../../core/services/stories.service';
import { Story } from '../../core/models/story.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

  stories: Story[] = [];
  loading = false;
  error: string | null = null;

  constructor(private storiesService: StoriesService, private router: Router) {}

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

}