import { NgModule } from '@angular/core';
import {  CommonModule } from '@angular/common';

import { FeaturemoduleRoutingModule } from './featuremodule-routing.module';
import { FeaturemoduleComponent } from './featuremodule.component';
import { SharedModule } from '../shared/shared/shared.module';
import { CrosstokenComponent } from '../crosstoken/crosstoken.component';
import { ApplyComponent } from './apply/apply.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompagnyComponent } from './compagny/compagny.component';

import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [FeaturemoduleComponent, CrosstokenComponent, ApplyComponent, JobsComponent, CompagnyComponent, ContactComponent],
  imports: [CommonModule, FeaturemoduleRoutingModule, SharedModule],
})
export class FeaturemoduleModule {}
