import { Component, Input } from '@angular/core';
import { Data } from '../../models/data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() data: Data | null = null;
}
