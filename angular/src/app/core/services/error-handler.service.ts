import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {}

  handle(error: unknown): void {
    let message = 'Erro inesperado. Tente novamente.';

    if (error instanceof HttpErrorResponse) {
      message = this.mapHttpError(error);
    } else if (error instanceof Error) {
      message = error.message;
    }

    console.error('❌ Erro capturado:', error);

    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  private mapHttpError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'Não foi possível conectar ao servidor.';
      case 400:
        return error.error?.message || 'Requisição inválida.';
      case 401:
        return 'Você não está autenticado.';
      case 403:
        return 'Você não tem permissão para essa ação.';
      case 404:
        return 'Recurso não encontrado.';
      case 409:
        return 'Conflito de dados.';
      case 422:
        return 'Dados inválidos.';
      case 500:
        return 'Erro interno no servidor.';
      default:
        return 'Erro inesperado (' + error.status + ').';
    }
  }
}