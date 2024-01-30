import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-ctrl',
  templateUrl: './patient-ctrl.component.html',
  styleUrls: ['./patient-ctrl.component.css']
})
export class PatientCtrlComponent {
  patients: any[] = [];
  newStatus = '';
  constructor(
    private modalService: NgbModal,
    private patientService: PatientService,
    private authService : AuthenticateService

  ) {}
  ngOnInit(): void {
    let id = localStorage.getItem('userId');
    this.getPatients();
  }
  getPatients() {
    this.patientService.getPatients().subscribe((data: any) => {
      console.log(data);
      this.patients = data;
    });
  }
  openConfirmationModal(patient: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.patient = patient;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          console.log(patient);
          
           this.updateStatus(patient);
        }
      }
    );
  }

  updateStatus(patient: any) {
    this.authService.approveUser(patient._id, patient.isSuspended).subscribe({
      next(value) {
        console.log(value);
      },
    });
  }
}
