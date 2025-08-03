import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPolls() {
    return this.http.get(`${this.apiUrl}/Encuestas`);
  }

  vote(pollId: string, optionId: string) {
    return this.http.post(`${this.apiUrl}/Encuestas/${pollId}/votar/${optionId}`, {}, { headers: this.getAuthHeaders() });
  }
}