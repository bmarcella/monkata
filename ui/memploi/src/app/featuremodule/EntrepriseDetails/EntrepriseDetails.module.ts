
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EntrepriseDetailsRoutingModule } from './EntrepriseDetails-routing.module';
import { EntrepriseDetailsComponent } from './EntrepriseDetails.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [EntrepriseDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    EntrepriseDetailsRoutingModule,
    SharedModule
  ]
})
export class EntrepriseDetailsModule { }