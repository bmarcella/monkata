import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { GMapModule } from 'primeng/gmap';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CountUpModule } from 'ngx-countup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxEditorModule } from 'ngx-editor';
import { LightboxModule } from 'ngx-lightbox/lightbox.module';
import { CvComponent } from 'src/app/featuremodule/components/cv/cv.component';
import { EntItemComponent } from 'src/app/featuremodule/components/ent-item/ent-item.component';
import { FormAnoComponent } from 'src/app/featuremodule/components/form-ano/form.component';
import { HomeJobItemComponent } from 'src/app/featuremodule/components/home-job-item/home-job-item.component';
import { ItemCandComponent } from 'src/app/featuremodule/components/item-cand/item-cand.component';
import { FooterComponent } from 'src/app/featuremodule/footer/footer-eight.component';
import { HeaderComponent } from 'src/app/featuremodule/header/header-eight.component';
import { ListMapComponent } from 'src/app/jobsmodule/listings/list-map/list-map.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { MyPaginationComponent } from '../components/my-pagination/my-pagination.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, ListMapComponent, BreadcrumbComponent, HomeJobItemComponent, EntItemComponent, ItemCandComponent, CvComponent, FormAnoComponent,  MyPaginationComponent],
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
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',
        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
        enterValidUrl: 'Please enter a valid URL',
      },
    }),
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
    FormAnoComponent,
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
    NgxEditorModule,
    AngularEditorModule,
    MyPaginationComponent,
  ],
})
export class SharedModule { }
