import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { FormsModule } from '@angular/forms';
import { CategorieViewComponent } from '../components/categorie-view/categorie-view.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    CategorieComponent,
    CategorieViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategorieRoutingModule,
    SharedModule
  ]
})
export class CategorieModule { }
