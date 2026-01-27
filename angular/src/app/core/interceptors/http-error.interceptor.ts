import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Erro inesperado';

      if (error.status === 0) {
        message = 'Servidor indisponível';
      } else if (error.status >= 400 && error.status < 500) {
        message = error.error?.message || 'Erro na requisição';
      } else if (error.status >= 500) {
        message = 'Erro interno do servidor';
      }

      snackBar.open(message, 'Fechar', {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'snackbar-error'
      });

      return throwError(() => error);
    })
  );
};
