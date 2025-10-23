import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Story {
  id?: number;
  title: string;
  excerpt: string;
  content?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  private apiUrl = 'http://localhost:8080/api/v1/stories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Story[]> {
    return this.http.get<Story[]>(this.apiUrl);
  }

  create(story: Story): Observable<Story> {
    return this.http.post<Story>(this.apiUrl, story);
  }

  getById(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.apiUrl}/${id}`);
  }

  update(id: number, story: Story): Observable<Story> {
    return this.http.put<Story>(`${this.apiUrl}/${id}`, story);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}