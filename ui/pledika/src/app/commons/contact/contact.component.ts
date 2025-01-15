import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  pos: any;

  constructor(private app: AppService) { }

  ngOnInit() {
   this.getContacts();
  }

lu=[];
nlu= [];
msg;
close(){
 this.msg = false;
 this.pos=-1;
}
getContacts() {
    this.app.getData(`${environment.apiUrl}getContacts`)
      .pipe(first())
      .subscribe(
        data => {
              console.log(data);
              this.lu = data.data[0].content;
              this.nlu = data.data[1].content;
        },
        error => {
        }
      );
  }

read(c,i) {
    this.app.editData(`${environment.apiUrl}contacts/${c.id}`,{read:true})
      .pipe(first())
      .subscribe(
        data => {
             this.lu.push(data);
             this.nlu.splice(i,1);
             this.msg.read = true;
        },
        error => {
        }
      );
  }

pread(c,i) {
this.msg = c;
this.pos = i;
}

}
