
import { Component, Input } from '@angular/core';
import { DFieldConfig } from '../decorators/DField';

@Component({
  selector: 'd-input',
  template: `<div [class]="field.container_class || '' "
    [id]="field.container_id || '' " >
    <label 
    [class]="field.label_class || '' "
    [id]="field.label_id || '' "
     >{{ field.label }}</label>
    <input
     (change)="valuechange($event)"
    [(ngModel)]="field.value"
    [value]="field.default || ''"
    [type]="field.type"
    [class]="field.class || '' "
    [placeholder]="field.placeholder || ''">
  </div>`,
  styles: []
})
export class InputComponent {
  @Input() field!: DFieldConfig;

  valuechange(newValue: any) {
    if (this.field.type == "checkbox") {
       this.field.value = newValue.target.checked
    }
  }
}