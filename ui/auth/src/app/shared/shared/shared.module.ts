import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CountUpModule } from 'ngx-countup';
import { NgxDropzoneModule } from 'ngx-dropzone';
// import { GMapModule } from 'primeng/gmap';
import { LightboxModule } from 'ngx-lightbox/lightbox.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {
  FooterComponent,
} from 'src/app/featuremodule/footer/footer-eight.component';
import {
  HeaderComponent,
} from 'src/app/featuremodule/header/header-eight.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    MatSliderModule,
    // GMapModule,
    NgApexchartsModule,
    MatCardModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    LightboxModule,
    MatFormFieldModule,
    // NgxSliderModule,
    CountUpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    MatSliderModule,
    NgxDropzoneModule,
  ],

  exports: [
    CarouselModule,
    HeaderComponent,
    FooterComponent,
    MatCardModule,
    NgApexchartsModule,
    // GMapModule,
    MatCardModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    LightboxModule,
    MatFormFieldModule,
    // NgxSliderModule,
    CountUpModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule,
    MatSliderModule,
    NgxDropzoneModule,
  ],
})
export class SharedModule { }
