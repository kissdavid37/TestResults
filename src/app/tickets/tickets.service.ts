import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getTickets(tcID: number) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/${tcID}`, httpOptions);
  }

  updateTicket(tcID: number, resolved: number, ticketName: string) {
    const requestbody = {
      resolved: resolved,
      ticketName: ticketName
    }
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    return this.http.put(`${this.baseUrl}/tickets/${tcID}`, requestbody, httpOptions);
  }

  createTicket(tcID: number, ticketName: string, ticketLink: string) {
    const token = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token
      })
    }
    const requestBody = {
      tcID: tcID,
      ticketName: ticketName,
      ticketLink: ticketLink
    }
    return this.http.post(`${this.baseUrl}/tickets/${tcID}`, requestBody,httpOptions);
  }
}
