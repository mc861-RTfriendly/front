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

  createTicket(body: any, file: File = null) {
    const formData: FormData = new FormData();
  
    formData.append('data', body);

    if (file) {
      formData.append('file', file);
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    };

    return this.http.post('/api/ticket', body);
  }
}
