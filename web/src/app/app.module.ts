import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';
import { HeaderComponent } from './containers/default-layout/header/header.component';
import { SideBarComponent } from './containers/default-layout/side-bar/side-bar.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ApplyDoctorComponent } from './views/apply-doctor/apply-doctor.component';
import { CardComponent } from './components/card/card.component';
import { AppointmentsComponent } from './views/appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardComponent,
    ApplyDoctorComponent,
    CardComponent,
    AppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
