import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private apiUrl = `${environment.apiUrl}/Encuestas`;

  constructor(private http: HttpClient) { }

  getPolls() {
    return this.http.get(this.apiUrl);
  }

  vote(pollId: string, optionId: string) {
    return this.http.post(`${this.apiUrl}/${pollId}/votar/${optionId}`, {});
  }

  createPoll(pollData: { titulo: string, opciones: string[] }) {
    return this.http.post(this.apiUrl, pollData);
  }

  deletePoll(pollId: string) {
    return this.http.delete(`${this.apiUrl}/${pollId}`);
  }
}