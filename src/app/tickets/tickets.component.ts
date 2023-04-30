import { Component } from '@angular/core';
import { Ticket } from './ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  tickets: Ticket[] = [];
}
