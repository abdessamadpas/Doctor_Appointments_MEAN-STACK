import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent {
  constructor(private doctorService: DoctorService) {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
  };

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.doctorService
      .getDoctorAppointments(localStorage.getItem('userId')!)
      .subscribe((data: any) => {
        console.log(data);
        this.calendarOptions.events = data.map((element: any) => ({
          title: element.patient.username + ' ' + element.timePicked,
          date: element.date.split('T')[0],
          color: element.status === "confirm" ? 'green' : element.status === "pending" ? 'orange' : 'red',
        }));
      });
  }
}
