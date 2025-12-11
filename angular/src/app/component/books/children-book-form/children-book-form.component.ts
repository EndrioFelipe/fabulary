import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-form',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule 
  ],
  templateUrl: './children-book-form.component.html',
  styleUrls: ['./children-book-form.component.css']
})
export class ChildrenBookFormComponent {
  bookForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.bookForm = this.fb.group({
    });
  }

   onSubmit(): void {
  }
}