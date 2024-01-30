import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  requests: any[] = [];
  newStatus = '';
  constructor(
    private modalService: NgbModal,
    private authService : AuthenticateService
  ) {}
  ngOnInit(): void {
    let id = localStorage.getItem('userId');
    this.getRequests();
  }
  getRequests() {
    this.authService.getRequests().subscribe((data: any) => {
      console.log(data);
      this.requests = data;
    });
  }
  openConfirmationModal(user: any) {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.user = user;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          console.log(user);
          
         this.updateStatus(user);
        }
      }
    );
  }

  updateStatus(user: any) {
    this.authService.approveUser(user._id, user.isSuspended).subscribe({
      next(value) {
        console.log(value);
      },
    });
  }
}
