import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { HeaderComponent } from './containers/default-layout/header/header.component';
import { SideBarComponent } from './containers/default-layout/side-bar/side-bar.component';
import { PatientComponent } from './views/patient/patient.component';
import { PatientModule } from './views/patient/patient.module';
import { PatientRoutingModule } from './views/patient/patient-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorComponent } from './views/doctor/doctor.component';
import { ProfileComponent } from './containers/default-layout/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';


import { FullCalendarModule } from '@fullcalendar/angular';
import { AdminComponent } from './views/admin/admin.component';
import { DashboardComponent } from './views/admin/dashboard/dashboard.component';
import { PatientCtrlComponent } from './views/admin/patient-ctrl/patient-ctrl.component';
import { DoctorCtrlComponent } from './views/admin/doctor-ctrl/doctor-ctrl.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    SideBarComponent,
   
    PatientComponent,
        DoctorComponent,
        ProfileComponent,
        AdminComponent,
        DashboardComponent,
        PatientCtrlComponent,
        DoctorCtrlComponent,
        ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PatientModule,
    PatientRoutingModule,
    HttpClientModule,
    FullCalendarModule,
    NgbModule
  ],
  
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
