
import { Component, Input, OnInit } from '@angular/core';
import { DFieldConfig } from '../decorators/DField';

@Component({
  selector: 'd-radio-group',
  template: `
  <div  [class]="field?.group_class || '' ">
  <div *ngIf="field?.group_title" [class]="field.group_title_class || '' ">
       {{ field?.group_title }}
  </div>
  <div *ngFor="let item of field?.data; let i = index"
    [class]="field.container_class || '' "
    [id]="field.container_id || '' " >

    <label 
  [class]="field.label_class || '' "
  [id]="field.label_id || '' "
   >{{ item[0].toUpperCase() + item.substr(1).toLowerCase() }}</label>
  <input
  (change)="field.value = item"
  [value]="field.default || ''"
  [name]="field.key || ''"
  type="radio"
  [class]="field.class || '' "
  [placeholder]="field.placeholder || ''">
 
  </div>
  
  </div>`,
  styles: []
})
export class RadioGroupComponent implements OnInit {
  
  @Input() field!: DFieldConfig;

  ngOnInit(): void {
    console.log(this.field);
  }

   titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  
}