import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
} from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPrintModule } from 'ngx-print';

import { AngularEditorModule } from '@kolkov/angular-editor';

import { ErrorInterceptor } from './_helper/ErrorInterceptor';
import { JwtInterceptor } from './_helper/JWTInterceptor';
import {
  LoaderInterceptorService,
} from './_Services/loader-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarHeaderComponent } from './calendar-header.component';
import { InternetComponent } from './internet/internet.component';
import { LoaderComponent } from './loader/loader.component';
import { FormaterPipe } from './pipes/formater.pipe';
import { PrintComponent } from './print/print.component';
import { AddCoursComponent } from './tools/add-cours/add-cours.component';
import { AddUsersComponent } from './tools/add-users/add-users.component';
import { AlertComponent } from './tools/alert/alert.component';
import {
  BulletinGenComponent,
} from './tools/bulletin-gen/bulletin-gen.component';
import { BulletinComponent } from './tools/bulletin/bulletin.component';
import { IndexComponent } from './tools/index/index.component';
import { LoadingComponent } from './tools/loading/loading.component';
import { PageWsComponent } from './tools/page-ws/page-ws.component';
import { RegisterComponent } from './tools/register/register.component';
import { ResultsWsComponent } from './tools/results-ws/results-ws.component';
import { TleftComponent } from './tools/tleft/tleft.component';
import { ToolsLeftComponent } from './tools/tools-left/tools-left.component';
import { ToolsRightComponent } from './tools/tools-right/tools-right.component';
import { TPageGenComponent } from './tools/tpage-gen/tpage-gen.component';
import { TRightComponent } from './tools/tright/tright.component';
import { TutoComponent } from './tuto/tuto.component';

// julesstacybianca@pledika.com
registerLocaleData(localeFr);
@NgModule({
  exports: [
    TleftComponent,
    TRightComponent,
    TPageGenComponent,
    ToolsLeftComponent,
    ToolsRightComponent,
  ],
  declarations: [
    AppComponent,
    LoaderComponent,
    InternetComponent,
    FormaterPipe,
    CalendarHeaderComponent,
    IndexComponent,
    ToolsLeftComponent,
    ToolsRightComponent,
    PageWsComponent,
    AlertComponent,
    ResultsWsComponent,
    LoadingComponent,
    BulletinComponent,
    TleftComponent,
    TRightComponent,
    BulletinGenComponent,
    TPageGenComponent,
    PrintComponent,
    TutoComponent,
    RegisterComponent,
    AddCoursComponent,
    AddUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPrintModule,
    NgxPageScrollModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
