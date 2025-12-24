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
import { UppercaseTitlePipe } from 'src/app/core/pipes/uppercase-title.pipe';
import { ChildrenBookService } from 'src/app/core/services/children-book.service';
import { Book } from 'src/app/core/models/book.model';

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
    MatSelectModule,
    UppercaseTitlePipe
  ],
  templateUrl: './children-book-form.component.html',
  styleUrls: ['./children-book-form.component.css']
})
export class ChildrenBookFormComponent {
  bookForm: FormGroup;
  numero:number = 2;
  titleUppercased:string = '';
  showFormat: boolean = false;
  ageRanges = Object.values(AgeRange).map(value => ({
    value,
    label: ageRangeLabel(value)
  }));
  

  constructor(private fb: FormBuilder, private router: Router, private childrenBookService: ChildrenBookService,
    private snackBar: MatSnackBar 
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
      authorName: ['', Validators.required],
      ageRange: [null, Validators.required] 
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const newBook: Book = this.bookForm.value;

      this.childrenBookService.create(newBook).subscribe({
        next: (response) => {
          console.log('✅ Conto criado com sucesso:', response);

          this.snackBar.open('Conto salvo com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });


          this.bookForm.reset();
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Erro ao criar conto:', err);
        }
      });
    } else {
      console.warn('Formulário inválido');
    }
  }

  comporHint() {
     let valor = this.bookForm.get('value')?.value;
    if(valor!==null){
      this.numero = Number(valor);
    }
  }

  transformToUpperCased(){
     let valor = this.bookForm.get('title')?.value;
    if(valor!==null){
      this.titleUppercased = valor;
    }
  }
}