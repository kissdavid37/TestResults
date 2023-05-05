import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HeaderComponent } from './header/header.component';
import { TestrunsComponent } from './testruns/testruns.component';
import { TestcasesComponent } from './testcases/testcases.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestcaseFilterPipe } from './testcases/testcase-filter.pipe';
import { CommonModule } from '@angular/common';
import { TestrunFilterPipe } from './testruns/testrun-filter.pipe';
import { TicketsComponent } from './tickets/tickets.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestrunsComponent,
    TestcasesComponent,
    TestcaseFilterPipe,
    TestrunFilterPipe,
    TicketsComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
