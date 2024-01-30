import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
  appointments: any[] = [];
  newStatus = '';
  constructor(
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    let id = localStorage.getItem('userId');

    this.doctorService.getDoctorAppointments(id).subscribe((data: any) => {
      console.log(data);
      this.appointments = data;
    });
  }
  openConfirmationModal(appointment: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.appointment = appointment;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.updateStatus(appointment);
        }
      },
      (reason) => {
        // Handle the modal dismissal or cancellation here
      }
    );
  }

  updateStatus(appointment: any) {
    // if (appointment.status === this.newStatus) {
    //   return;
    // }

    this.appointmentService
      .changeStatusAppointment(appointment._id, appointment.status)
      .subscribe({
        next(value) {
          console.log(value);
        },
      });
  }
}
