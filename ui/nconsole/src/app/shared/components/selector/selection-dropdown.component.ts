import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selection-dropdown',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <div class="mb-4">
      <select 
        class="form-select form-select-lg shadow-sm" 
        [(ngModel)]="selected"
        (ngModelChange)="onSelectionChange($event)">
        <option [ngValue]="undefined">{{ placeholder }}</option>
        <option [ngValue]="item" *ngFor="let item of items">
          {{ item.name }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .form-select {
      background-color: white;
      border: 1px solid #e5e7eb;
      font-size: 1rem;
      height: 3.5rem;
    }
    
    .form-select:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px var(--primary-light);
    }
  `]
})
export class SelectionDropdownComponent {
  @Input() items: any[] = [];
  @Input() placeholder = 'Select an option...';
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter<any>();

  onSelectionChange(value: any) {
    this.selectedChange.emit(value);
  }
}