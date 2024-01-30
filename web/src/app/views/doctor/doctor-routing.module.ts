import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalenderComponent } from './calender/calender.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { ProfileComponent } from 'src/app/containers/default-layout/profile/profile.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
 
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'calendar',
        component: CalenderComponent,
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
      {
        path: 'patients',
        component: PatientsListComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: '',
        redirectTo: 'doctor/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
