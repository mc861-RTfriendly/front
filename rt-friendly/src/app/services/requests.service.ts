import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(
    private http: HttpClient,
  ) { }

  getAll(email: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: {
        email: email,
      }
    };

    return this.http.get('/api/queues', options);
  }

  createTicket(body: any) {
    return this.http.post('/api/ticket', body);
  }
}
