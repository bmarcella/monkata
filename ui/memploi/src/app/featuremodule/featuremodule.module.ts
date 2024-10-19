import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CrosstokenComponent } from '../crosstoken/crosstoken.component';
import { SharedModule } from '../shared/shared/shared.module';
import { ApplyComponent } from './apply/apply.component';
import { CompagnyComponent } from './compagny/compagny.component';
import { FeaturemoduleRoutingModule } from './featuremodule-routing.module';
import { FeaturemoduleComponent } from './featuremodule.component';
import { JobsComponent } from './jobs/jobs.component';

import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [FeaturemoduleComponent, CrosstokenComponent, ApplyComponent, JobsComponent, CompagnyComponent, ContactComponent],
  imports: [CommonModule, FeaturemoduleRoutingModule, SharedModule],
})
export class FeaturemoduleModule { }
