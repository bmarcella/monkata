import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: "app-prof-details",
  template: `<br/><span *ngIf="prof" class="badge badge-primary" > {{ prof.lastName +' '+ prof.lastName }}</span>`,
  styleUrls: ["./prog-details.component.css"],
})
export class ProfDetailsComponent implements OnInit {
  @Input()
  cours : any;
  prof: any;
  constructor( private app: AppService) {}

  

  ngOnInit() {
    this.getProf();
  }


  getProf() {
    const url =  `${environment.apiUrl}courses/${this.cours.id}/prof`;
    this.app
      .getData(url)
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.prof = data as Partial<{ id: number , lastName: string, firstName: string , code : string }>;
        },
        (error) => {}
      );
  }

 
}
