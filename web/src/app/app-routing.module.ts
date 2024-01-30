import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './containers/default-layout/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'patient',
    // canActivateChild: [AuthGuard],
    data: { role: 'patient' },
    loadChildren: () =>
      import('./views/patient/patient.module').then((m) => m.PatientModule),
  },
  {
    path: 'doctor',
    // canActivateChild: [AuthGuard],
    data: { role: 'doctor' },

    loadChildren: () =>
      import('./views/doctor/doctor.module').then((m) => m.DoctorModule),
  },
  {
    path: 'admin',
    // canActivateChild: [AuthGuard],
    data: { role: 'admin' },

    loadChildren: () =>
    import('./views/admin/admin.module').then((m) => m.AdminModule),
},  
  {
    path : 'profile/:id',
    component : ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
