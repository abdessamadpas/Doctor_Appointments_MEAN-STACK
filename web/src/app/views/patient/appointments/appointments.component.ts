import { Component } from '@angular/core';
import { Appointment } from 'src/app/models/appointment';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  constructor(private patientService: PatientService) {}
  appointmentsList: Appointment[] = [];
  ngOnInit() {
    const id = localStorage.getItem('userId');
    if (id === null) {
      throw new Error('userId is null');
    }
    
    this.patientService.getPatientAppointments(id).subscribe((data) => {
      this.appointmentsList = data;
      console.log(this.appointmentsList);
      
    });
  }
}
