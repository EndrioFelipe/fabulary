import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AgeRange, ageRangeLabel  } from 'src/app/core/enums/age-range';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-book-form',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule ,
    MatSelectModule   
  ],
  templateUrl: './children-book-form.component.html',
  styleUrls: ['./children-book-form.component.css']
})
export class ChildrenBookFormComponent {
  bookForm: FormGroup;

  numero:number = 2;
  showFormat: boolean = false;
  ageRanges = Object.values(AgeRange).map(value => ({
    value,
    label: ageRangeLabel(value)
  }));
  

  constructor(private fb: FormBuilder, private router: Router,
    private snackBar: MatSnackBar 
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
      ageRange: ['', Validators.required]
    });
  }

   onSubmit(): void {
  }

  teste() {
     let valor = this.bookForm.get('value')?.value;
    if(valor!==null){
      this.numero = Number(valor);
    }

  }
}