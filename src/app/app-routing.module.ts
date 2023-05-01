import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestrunsComponent } from './testruns/testruns.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
  { path: '', component: TestrunsComponent },
  { path: 'testruns', component: TestrunsComponent },
  { path: 'testcases', component: TestcasesComponent },
  { path: 'tickets/:id', component: TicketsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
