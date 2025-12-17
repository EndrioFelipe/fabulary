import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloService } from 'src/app/core/services/hello/hello.service';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="p-6">
      <h2>Mensagem protegida</h2>
      <p *ngIf="message; else loading">{{ message }}</p>
      <ng-template #loading>Carregando...</ng-template>
    </section>
  `
})
export class HelloComponent implements OnInit {
  message: string | null = null;

  constructor(private hello: HelloService) {}

  ngOnInit(): void {
    this.hello.getHelloMessage().subscribe({
      next: (res) => this.message = res, // resposta é texto puro
      error: () => this.message = 'Erro ao carregar a mensagem.'
    });
  }
}
