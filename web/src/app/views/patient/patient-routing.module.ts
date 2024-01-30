import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PickDoctorComponent } from './pick-doctor/pick-doctor.component';
import { ApplyDoctorComponent } from './apply-doctor/apply-doctor.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ProfileComponent } from 'src/app/containers/default-layout/profile/profile.component';

const routes: Routes = [
  {
    path: '',

    data: { role: 'patient' },
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'pickDoctor',
        component: PickDoctorComponent,
      },
      {
        path: 'applyDoctor/:id',
        component: ApplyDoctorComponent,
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
      {
        path: 'profile',
        component:ProfileComponent
      },
      {
        path: '',
        redirectTo: 'patient/dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
