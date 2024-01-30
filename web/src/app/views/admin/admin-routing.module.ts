import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from 'src/app/containers/default-layout/default-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientCtrlComponent } from './patient-ctrl/patient-ctrl.component';
import { DoctorCtrlComponent } from './doctor-ctrl/doctor-ctrl.component';
import { ProfileComponent } from 'src/app/containers/default-layout/profile/profile.component';
import { RequestsComponent } from './requests/requests.component';

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
        path: 'requests',
        component: RequestsComponent,
      },
      {
        path: 'patients',
        component: PatientCtrlComponent,
      },
      {
        path: 'doctors',
        component: DoctorCtrlComponent,
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
export class AdminRoutingModule {}
