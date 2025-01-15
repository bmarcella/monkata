import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionTable } from '../DTable';

@Component({
  selector: 'app-my-actions',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {
  @Input() actions?: ActionTable [];
  @Input() data?: any;
  @Output() action = new EventEmitter<any>();

  onAction(action: ActionTable, row: any, event: any) {
    this.action.emit({ action, row, event });
  }
}
