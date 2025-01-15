import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionComponent } from './actions/action.component';
import { DTableComponent } from './DTableComponent';
import { PaginationComponent } from './pagination/my-pagination.component';



@NgModule({
  declarations: [
    DTableComponent,
    PaginationComponent,
    ActionComponent
  ],
  imports: [
      CommonModule,
      FormsModule
  ],
  exports: [
    DTableComponent
  ]
})
export class DTableModule { }
