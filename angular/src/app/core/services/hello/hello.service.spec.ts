import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface HelloResponse { message: string; }

@Injectable({ providedIn: 'root' })
export class HelloService {
  // ajuste se você já usa environment
  private readonly url = 'http://localhost:8080/api/v1/hello';

  constructor(private http: HttpClient) {}

  getHello(): Observable<HelloResponse> {
    return this.http.get<HelloResponse>(this.url);
  }
}