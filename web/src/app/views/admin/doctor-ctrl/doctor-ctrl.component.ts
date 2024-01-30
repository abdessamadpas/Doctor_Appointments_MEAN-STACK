import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-ctrl',
  templateUrl: './doctor-ctrl.component.html',
  styleUrls: ['./doctor-ctrl.component.css'],
})
export class DoctorCtrlComponent {
  doctors: any[] = [];
  newStatus = '';
  constructor(
    private modalService: NgbModal,
    private doctorService: DoctorService,
    private authService : AuthenticateService
  ) {}
  ngOnInit(): void {
    let id = localStorage.getItem('userId');
    this.getDoctors();
  }
  getDoctors() {
    this.doctorService.getDoctors().subscribe((data: any) => {
      console.log(data);
      this.doctors = data;
    });
  }
  openConfirmationModal(doctor: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.doctor = doctor;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          console.log(doctor);
          
          this.updateStatus(doctor);
        }
      }
    );
  }

  updateStatus(doctor: any) {
    this.authService.approveUser(doctor._id, doctor.isSuspended).subscribe({
      next(value) {
        console.log(value);
      },
    });
  }
}
