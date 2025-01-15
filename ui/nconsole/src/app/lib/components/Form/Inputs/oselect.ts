
import { Component, Input } from '@angular/core';
import { DFieldConfig } from '../decorators/DField';

@Component({
  selector: 'd-oselect',
  template: `<div [class]="field.container_class || '' "
    [id]="field.container_id || '' " >
    <label
    [class]="field.label_class || '' "
    [id]="field.label_id || '' "
     >{{ field.label }}</label>
    <select [class]="field.class || '' "  [(ngModel)]="field.value">
         <option *ngFor="let item of field.data" [ngValue]="getValue(item)" >{{ getLabel(item) }}</option>
    </select>
  </div>`,
  styles: []
})
export class OSelectComponent {
  @Input() field!: DFieldConfig;



  getValue(item: any){
    if (this.field.option?.value=="#this"){
      return item;
    } else {
      return item[this.field.option?.value || ''];
    }
  }

  getLabel(item: any){
   
    if (this.field.option?.key=="#this"){ 
        return item;
     } else {
      if(this.field.option==undefined) return item;
      Object.keys(item).forEach(key => {
        console.log(key, item,this.field.option?.key, item[key]);
        if(this.field.option==undefined) return;
        this.field.option.key = this.field.option?.key.replace("${"+key+"}", item[key]);
      });
      return this.field.option?.key;
    }
  }
}