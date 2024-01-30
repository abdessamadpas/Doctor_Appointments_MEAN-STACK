import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
nextAppointments :any[] = [];
  constructor(private appointmentService : AppointmentService) { }
ngOnInit(): void {
  this.appointmentService.getNextAppoitments( localStorage.getItem('userId')!).subscribe((data: any) => {
    console.log("emmmm",data);
    this.nextAppointments = data;
  }
  );
}
}
