import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirmation</h4>
      <button
        type="button"
        class="close"
        aria-label="Close"
        (click)="activeModal.dismiss('cancel')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      Are you sure you want to change the status to
      <!-- <strong>{{ appointment.status || appointment.isSuspended }}</strong -->
      >?
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="activeModal.dismiss('cancel')"
      >
        Cancel
      </button>
      <button type="button" class="btn btn-primary" (click)="confirm()">
        Confirm
      </button>
    </div>
  `,
})
export class ConfirmationModalComponent {
  @Input() appointment: any;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    // Close the modal with the 'confirm' result
    this.activeModal.close('confirm');
  }
}
