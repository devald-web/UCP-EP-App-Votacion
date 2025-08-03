import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'jwt_token';
  private decodedToken: any;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  private loadToken() {
    const token = this.getToken();
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }

  register(credentials: any) {
    return this.http.post(`${this.apiUrl}/Users/register`, credentials);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/Users/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.decodedToken = jwtDecode(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.decodedToken = null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.decodedToken && this.decodedToken.role === 'admin';
  }

  getCurrentUserId(): string | null {
    return this.decodedToken ? this.decodedToken.sub : null;
  }
}
