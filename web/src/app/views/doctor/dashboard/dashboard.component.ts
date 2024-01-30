import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  recentAppointments: Appointment[] = [];
  card1Title = 'Appointments';
  card1Date = 'Today';
  card1Value = '0';
  card1Icon = 'fa-calendar';

  card2Title = 'Patients';
  card2Date = 'Today';
  card2Value = '5';
  card2Icon = 'fa-user';

  constructor(private appointmentService: AppointmentService) {}
  ngOnInit(): void {
    this.appointmentService
      .getConfirmedAppointmentsDay(localStorage.getItem('userId')!, new Date())
      .subscribe((data: any) => {
        console.log(data);
        this.recentAppointments = data;
        this.card1Value = this.recentAppointments.length.toString();
      });
  }
}
