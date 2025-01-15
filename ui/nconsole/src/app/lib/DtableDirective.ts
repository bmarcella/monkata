import { Directive, ViewContainerRef } from '@angular/core';
import { DTable } from './components/Table/DTable';
import { DTableComponent } from './components/Table/DTableComponent';

@Directive({
  selector: '[dTable]'
})
export class DTableDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  getDTableComponent<T>(table: DTable<T>) {
    this.viewContainerRef.clear();
   const c =  this.viewContainerRef.createComponent(DTableComponent<T>);
   c.instance.DTable = table;

  }


}