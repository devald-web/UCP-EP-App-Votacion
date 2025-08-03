import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = `${environment.apiUrl}/Encuestas`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPolls() {
    return this.http.get(this.apiUrl);
  }

  vote(pollId: string, optionId: string) {
    return this.http.post(`${this.apiUrl}/${pollId}/votar/${optionId}`, {}, { headers: this.getAuthHeaders() });
  }

  createPoll(pollData: { titulo: string, opciones: string[] }) {
    return this.http.post(this.apiUrl, pollData, { headers: this.getAuthHeaders() });
  }

  deletePoll(pollId: string) {
    return this.http.delete(`${this.apiUrl}/${pollId}`, { headers: this.getAuthHeaders() });
  }
}
