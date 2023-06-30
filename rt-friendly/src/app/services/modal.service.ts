import { Injectable } from '@angular/core';                                                                                                                                                            
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef: any;

  constructor(
     public modal: MatDialog,
  ) { }

  openModal(component: any, configurations = null) {
    this.modalRef = this.modal.open(component, configurations);
    return this.modalRef.afterClosed();
  }

  closeModal(response = null) {
    this.modalRef.close(response);
  }
}
