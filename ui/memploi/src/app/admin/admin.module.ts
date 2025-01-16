import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { AdminModuleRoutingModule } from './admin-routing.module';
import { AdminmoduleComponent } from './adminmodule.component';
import { HeaderAdminComponent } from './common/header-admin/header-admin.component';




@NgModule({
  declarations: [AdminmoduleComponent, HeaderAdminComponent],
  imports: [CommonModule, AdminModuleRoutingModule, SharedModule],
  providers: [],
  exports: []
})
export class AdminModule { }
