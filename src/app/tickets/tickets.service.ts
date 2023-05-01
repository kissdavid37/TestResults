import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { }

  getTickets(tcID: number) {
    return this.http.get<Ticket[]>(`http://127.0.0.1:5000/tickets/${tcID}`);
  }

  updateTicket(tcID: number, resolved: number, ticketName: string) {
    const requestbody = {
      resolved: resolved,
      ticketName: ticketName
    }
    return this.http.put(`http://127.0.0.1:5000/tickets/${tcID}`, requestbody);
  }

  createTicket(tcID: number, ticketName: string, ticketLink: string) {
    const requestBody = {
      tcID: tcID,
      ticketName: ticketName,
      ticketLink: ticketLink
    }
    return this.http.post(`http://127.0.0.1:5000/tickets/${tcID}`, requestBody);
  }
}
