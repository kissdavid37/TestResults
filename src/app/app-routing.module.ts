import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestrunsComponent } from './testruns/testruns.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'testruns', component: TestrunsComponent, canActivate: [AuthGuard] },
  { path: 'testcases', component: TestcasesComponent, canActivate: [AuthGuard] },
  { path: 'tickets/:id', component: TicketsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
