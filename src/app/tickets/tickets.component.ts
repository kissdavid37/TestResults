import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket';
import { TicketsService } from './tickets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  isFetching = false;
  errorMessage: string = null
  url: string;
  error = false

  constructor(private ticketService: TicketsService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.isFetching = true;
    console.log(this.route.snapshot.params.id)
    this.onGetTickets(this.route.snapshot.params.id);
  }

  onGetTickets(tcID: number) {
    this.ticketService.getTickets(tcID).subscribe({
      next: (ticket) => {
        this.isFetching = false;
        this.tickets = ticket;
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error;
        this.error = true;
        console.log(e);
      }
    })
  }

  onUpdateResolvedState(resolved: number, ticketName: string) {
    this.ticketService.updateTicket(this.route.snapshot.params.id, resolved, ticketName).subscribe({
      next: () => {
        this.onGetTickets(this.route.snapshot.params.id);
      },
      error: (e: HttpErrorResponse) => {
        this.errorMessage = e.error;
        this.error = true
      }
    })
  }

  getResolvedState(result: { resolved: number, ticketName: string, ticketLink: string }) {
    return {
      'list-success': result.resolved === 1,
      'list-fail': result.resolved === 0
    }
  }
}
