import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DFormComponent } from './DFormComponent';
import { InputComponent } from './Inputs/input';
import { OSelectComponent } from './Inputs/oselect';
import { RadioGroupComponent } from './Inputs/radio-group';
import { SelectComponent } from './Inputs/select';
import { TextAreaComponent } from './Inputs/text-area';




@NgModule({
  declarations: [
    DFormComponent,
    InputComponent,
    SelectComponent,
    TextAreaComponent,
    RadioGroupComponent,
    OSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DFormComponent,
    InputComponent,
    SelectComponent,
    TextAreaComponent,
    RadioGroupComponent,
    OSelectComponent
  ]
})
export class DFormModule { }
