import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { CardModule } from 'src/app/components/card/card.model';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    DashboardComponent,
    CalenderComponent,
    AppointmentsComponent,
    PatientsListComponent,
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    DoctorRoutingModule,
    CardModule,
    FormsModule,FullCalendarModule
  ]
})
export class DoctorModule { }
