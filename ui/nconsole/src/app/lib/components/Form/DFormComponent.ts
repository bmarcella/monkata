import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DFormTemplate } from "./DFormTemplate";

@Component({
  selector: 'd-form-monkata',
  templateUrl: "./view/dform.template.html",
  styles: []
})
export class DFormComponent<T> implements OnInit, OnDestroy{ 
    @Input()  DForm! : DFormTemplate<T> ;

    constructor() {
    
    }
  ngOnDestroy(): void {
   this.DForm.close()
  }
  ngOnInit(): void {
    console.log(this.DForm);
  }

  onSubmit(e: any){
   const data: T = this.DForm.getFormValue() as T;
    this.DForm.onSubmit(data);
  }


 
}