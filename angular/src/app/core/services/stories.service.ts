import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story.model';
import { environment } from 'src/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  
  private apiUrl = environment.apiGateway + '/api/v1/stories';

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