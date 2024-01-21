import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ApplyDoctorComponent } from './views/apply-doctor/apply-doctor.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';

const routes: Routes = [
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'login', component: LoginComponent },
  { path: 'applyDoctor', component: ApplyDoctorComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
