import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css'],
})
export class EncaissementComponent implements OnInit {
  loading: any;
  pass = { code: "" , pin:"", montant: "", raison: "" , tcs:0} ;
  response = { state: '', message: '', active: false };
  submitted = false;
  constructor(public studServ: StudentsService, public nServ: AppService) {}

  ngOnInit() {

  }

  setDate(date: any) {
    const nd = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');
    return nd;
  }

  setEnc()  {
  const DATA  = {
     montant : this.pass.montant,
     raison:   this.pass.raison,
    };
  const url = `${environment.apiUrl}caisse/${this.pass.pin}/${this.pass.code}/${this.pass.tcs}`;
  this.loading = true;
  this.response.active = false;
  this.nServ
     .setData(url, DATA)
     .pipe(first())
     .subscribe(
       (data) => {
         this.loading = false;
         this.response.active = true;
         if (!data.crash) {
           this.response.state = 'success';
           this.response.message = data.message;
           this.pass = { code: "", pin: "", montant: "", raison: "", tcs: 0 };
         } else {
           this.response.state = 'danger';
           this.response.message = data.message;
         }
       },
       (error) => {
         this.response.active = true;
         this.response.state = 'danger';
         this.response.message = error;
         this.loading = false;
       }
     );
  }


}
