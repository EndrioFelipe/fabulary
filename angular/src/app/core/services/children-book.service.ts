import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment.development';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class ChildrenBookService {

  private apiUrl = environment.apiGateway + '/api/v1/stories/children';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  create(Book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, Book);
  }

  getById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  update(id: number, Book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, Book);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
