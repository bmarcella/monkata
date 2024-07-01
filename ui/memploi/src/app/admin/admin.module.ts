import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminmoduleComponent } from './adminmodule.component';
import { SharedModule } from '../shared/shared/shared.module';
import { AdminModuleRoutingModule } from './admin-routing.module';
import { HeaderAdminComponent } from './common/header-admin/header-admin.component';




@NgModule({
  declarations: [AdminmoduleComponent, HeaderAdminComponent],
  imports: [CommonModule, AdminModuleRoutingModule, SharedModule],
  providers: [],
  exports: []
})
export class AdminModule { }
