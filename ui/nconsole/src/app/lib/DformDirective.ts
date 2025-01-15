import { Directive, ViewContainerRef } from '@angular/core';
import { DFormComponent } from './components/Form/DFormComponent';
import { DFormTemplate } from './components/Form/DFormTemplate';


@Directive({
  selector: '[dForm]'
})
export class DFormDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

  getDFormComponent<T>(name: string, FormModel: any ) : { component: any, formTemplate: DFormTemplate<T>} {
    const form = new DFormTemplate<T>(name, FormModel as T);
    this.viewContainerRef.clear();
    const c =  this.viewContainerRef.createComponent(DFormComponent<T>);
    c.instance.DForm = form;
    return {
      component : c,
      formTemplate: form,
    }
  }


}