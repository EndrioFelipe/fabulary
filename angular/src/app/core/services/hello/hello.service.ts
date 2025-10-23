import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private apiUrl = 'http://localhost:8080/api/v1/hello'; // ajuste se sua API estiver em outra porta

  constructor(private http: HttpClient) {}

  getHelloMessage(): Observable<string> {
    // O backend retorna texto simples ("Hello, admin!"), não JSON
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }
}