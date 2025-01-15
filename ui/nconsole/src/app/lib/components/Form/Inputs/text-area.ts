
import { Component, Input } from '@angular/core';
import { DFieldConfig } from '../decorators/DField';

@Component({
  selector: 'd-text-area',
  template: `<div [class]="field.container_class || '' "
    [id]="field.container_id || '' " >
    <label 
    [class]="field.label_class || '' "
    [id]="field.label_id || '' "
     >{{ field.label }}</label>
    <textarea
     [(ngModel)]="field.value"
    [value]="field.default || ''"
    [class]="field.class || '' "
    [placeholder]="field.placeholder || ''">
    {{ field?.default }}
    </textarea>
  </div>`,
  styles: []
})
export class TextAreaComponent {
  @Input() field!: DFieldConfig;
}