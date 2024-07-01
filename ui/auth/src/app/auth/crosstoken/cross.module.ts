import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { CrosstokenComponent } from './crosstoken.component';
import { CrossRoutingModule } from './cross-routing.module';


@NgModule({
  declarations: [
    CrosstokenComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    CrossRoutingModule
  ]
})
export class CrossModule { }
