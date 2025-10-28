import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-story-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css']
})
export class StoryFormComponent {
  storyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.storyForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.storyForm.valid) {
      console.log(this.storyForm.value);
    }
  }
}