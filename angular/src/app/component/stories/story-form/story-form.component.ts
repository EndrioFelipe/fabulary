import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoriesService } from 'src/app/core/services/stories.service';
import { Story } from 'src/app/core/models/story.model';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-story-form',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule 
  ],
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent {
  storyForm: FormGroup;

  constructor(private fb: FormBuilder, private storiesService: StoriesService, private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.storyForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

   onSubmit(): void {
    if (this.storyForm.valid) {
      const newStory: Story = this.storyForm.value;

      this.storiesService.create(newStory).subscribe({
        next: (response) => {
          console.log('✅ Conto criado com sucesso:', response);
         
          //o estilo do snackbar vai estar no arquivo de estilo css globalo, o styles.css
          this.snackBar.open('Conto salvo com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
         
         
          this.storyForm.reset();
          //voltar para a tela de contos
          this.router.navigate(['/stories']);
        },
        error: (err) => {
          console.error('❌ Erro ao criar conto:', err);
        }
      });
    } else {
      console.warn('⚠️ Formulário inválido');
    }
  }
}