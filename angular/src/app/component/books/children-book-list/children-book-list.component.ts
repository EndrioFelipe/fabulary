import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
      MatIconModule
    ],
})
export class ChildrenBookListComponent {

    constructor( private router: Router, private snackBar: MatSnackBar 
    ) {}

   createBook(): void {
    this.router.navigate(['/books/new']);
  }

}
