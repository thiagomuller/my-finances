import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{

  @Input()
  showModal: boolean

  @Output()
  showModalChange = new EventEmitter<boolean>()

  constructor() { }

  toggleModal = () => {
    this.showModal = !this.showModal
    this.showModalChange.emit(this.showModal)
  }

}
