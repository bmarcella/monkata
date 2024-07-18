import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import {
  checkValidator,
  toggleButton,
  Val,
} from 'src/app/core/Validator';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';

import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy  {
  editor: Editor;
  html = '';

  c : any = {
    full_name: "",
    email:"",
    subject: "",
    message: ""
  };
  constructor( private aUI:  AlertService, public router: Router, public act: ActivatedRoute, private crud: CrudService ) {

  }
  ngOnInit(): void {
   this.editor = new Editor();
   this.reset();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  reset (){
    this.c  = {
      full_name: "",
      email:"",
      subject: "",
      message: ""
    };
  }


  val : Val[]  = [
    {
     name : "full_name",
     mlength : 50,
     message: "Nom complet ne doit pas etre vide.",
     mlmessage : "Nom complet ne doit pas depasser 50 characteres."
    },
    {
      name : "email",
      mlength : 255,
      message: "Email ne doit pas etre vide.",
      mlmessage : "Email ne doit pas depasser 255 characteres."
    },
    {
      name : "subject",
      mlength : 100,
      message: "Vous devez ajouter le sujet",
      mlmessage : "Le sujet du poste ne doit pas depasser 100 characteres."
    },
    {
      name : "message",
      mlength : 2000,
      length: 50,
      lmessage:"Votre message doit contenir au moins 50 characteres.",
      message: "Message* ne doit pas etre vide.",
      mlmessage : "La Message* ne doit pas depasser 5000 characteres."
     },
  ];

  async sendContact(e: any){

    const rep: any = await checkValidator (this.c, this.val, e);
    if (rep.error) {
       this.aUI.show({ active : true, message : rep.message , type: "danger", pos: 'top-right', time: 4000 });
       toggleButton(e, false);
       return;

    }
    const URL = getURL("memploi","cv/contact");
    this.crud.postRC(URL, this.c, e).then((r) => {
     this.reset();
     this.aUI.show({ active : true, message: "Nous avons bien recu votre message!" , type: "success", pos: 'top-right' });
    }).catch((e) => {
      const msg = e.error.error.message;
      this.aUI.show({ active : true, message:msg , type: "danger", pos: 'top-right' });
      console.log(e);
      console.log(msg);
    });
  }


}
