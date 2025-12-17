import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoriesService } from 'src/app/core/services/stories.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Story } from '../../../core/models/story.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-read-story',
  standalone: true,
  imports: [CommonModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule 
  ],
  templateUrl: './read-story.component.html',
  styleUrls: ['./read-story.component.css']
})
export class ReadStoryComponent implements OnInit {

  story?: Story;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.storyService.getById(+id).subscribe({
        next: (data) => {
          this.story = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/stories']);
  }
}