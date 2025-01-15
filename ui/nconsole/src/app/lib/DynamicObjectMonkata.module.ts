import { NgModule } from '@angular/core';
import { DFormModule } from './components/Form/dform.module';
import { DTableModule } from './components/Table/dtable.module';
import { DFormDirective } from './DformDirective';
import { DTableDirective } from './DtableDirective';


@NgModule({
  declarations: [
    DTableDirective,
    DFormDirective
  ],
  imports: [
    DTableModule,
    DFormModule
  ],
  exports: [
    DTableModule,
    DFormModule,
    DTableDirective,
    DFormDirective
  ]
})
export  class DynamicObjectMonkataModule { }
