import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyDoctorComponent } from './apply-doctor/apply-doctor.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PickDoctorComponent } from './pick-doctor/pick-doctor.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'src/app/components/card/card.model';


@NgModule({
  declarations: [
    DashboardComponent,
    ApplyDoctorComponent,
    AppointmentsComponent,
    PickDoctorComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    CardModule
  ]
})
export class PatientModule { }
