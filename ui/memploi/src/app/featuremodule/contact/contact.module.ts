import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { ContactRoutingModule } from './contact-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    NgxEditorModule,
  ],
  exports: [ FormsModule]
})
export class ContactModule { }
