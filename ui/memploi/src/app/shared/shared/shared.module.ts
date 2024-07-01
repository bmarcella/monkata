import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { GMapModule } from 'primeng/gmap';
import { LightboxModule } from 'ngx-lightbox/lightbox.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CountUpModule } from 'ngx-countup';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FooterComponent } from 'src/app/featuremodule/footer/footer-eight.component';
import { HeaderComponent } from 'src/app/featuremodule/header/header-eight.component';
import { ListMapComponent } from 'src/app/jobsmodule/listings/list-map/list-map.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomeJobItemComponent } from 'src/app/featuremodule/components/home-job-item/home-job-item.component';
import { EntItemComponent } from 'src/app/featuremodule/components/ent-item/ent-item.component';
import { ItemCandComponent } from 'src/app/featuremodule/components/item-cand/item-cand.component';
import { CvComponent } from 'src/app/featuremodule/components/cv/cv.component';

@NgModule({
  declarations: [ HeaderComponent, FooterComponent, ListMapComponent, BreadcrumbComponent,  HomeJobItemComponent, EntItemComponent, ItemCandComponent, CvComponent],
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
    AngularEditorModule,
  ],

  exports: [
    CarouselModule,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    HomeJobItemComponent,
    EntItemComponent,
    ItemCandComponent,
    CvComponent,
    MatCardModule,
    NgApexchartsModule,
    // GMapModule,
    ListMapComponent,
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
    AngularEditorModule
  ],
})
export class SharedModule { }
