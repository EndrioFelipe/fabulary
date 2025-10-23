import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { RegisterRequest } from 'src/core/models/RegisterRequest';
import { AuthenticationRequest } from 'src/core/models/AuthenticationRequest';
import { AuthenticationResponse } from 'src/core/models/AuthentificationResponse';
import { User } from 'src/core/models/User';

const BASE_URL = 'http://127.0.0.1:8080/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // === LOGIN ===
  login(auth: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(BASE_URL + 'auth/login', auth).pipe(
      tap(response => {
        // salva os tokens corretos retornados pelo backend
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        localStorage.setItem('username', response.name);
        localStorage.setItem('role', response.role);
      })
    );
  }

  // === REGISTER ===
  register(data: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(BASE_URL + 'auth/register', data);
  }

  // === USERS TEST ===
  user(): Observable<User[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:8080/api/v1/test/users';
    return this.http.get<User[]>(url, { headers });
  }

  // === TOKEN ===
  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && token.trim() !== '';
  }

  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token || !token.includes('.')) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        return new Date(decodedToken.exp * 1000);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return null;
  }

  // === LOGOUT ===
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return true;
  }

  log(message: string): void {
    console.log('User Auth Service ' + message);
  }
}