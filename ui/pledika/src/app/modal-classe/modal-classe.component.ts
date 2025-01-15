import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../_Services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-modal-classe',
  templateUrl: './modal-classe.component.html',
  styleUrls: ['./modal-classe.component.css']
})
export class ModalClasseComponent implements OnInit {
  prog: any;

  constructor(public nServ: AppService,
              private route: ActivatedRoute,
              private router: Router, private fb: UntypedFormBuilder) { }

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }

  loading = false;
  lNiv = false;
  error: any;

  @Input() villes: any;
  sNiv: any;
  stud: any;
  addForm: UntypedFormGroup;
  submitted = false;
  success = '';
  response = { state: '', message: '', active: false };
  // tslint:disable-next-line: variable-name
  click_add = true;
  var: any;

  @Input() niveaux: any;
  // tslint:disable-next-line: variable-name
  @Input() idModal: string;
  @Input() niv;
  @Input() code_niv;
  @Input() option: string;
  @Input() dom: string;
  @Input() classe: string;
  @Input() salles;
  @Input() vacs;
  @Input() io;
  @Input() in;
  @Input() id;

  @Output() addNewNR = new EventEmitter();
  prog_id;
  ngOnInit() {
    this.initForm();
    this.getProgs();
  }
  getProgs() {
    const url = `${environment.apiUrl}programmes?size=200`;
    this.nServ.getData(url).pipe(first())
      .subscribe(
        data => {
          this.prog = data._embedded.programmes;
        },
        error => {
        }
      );
  }

  initForm() {
    this.addForm = this.fb.group({
      salle: [''],
      csalle: ['', Validators.required],
      prog_id: ['', Validators.required],
      vac : ['MT', Validators.required],
    });
  }

  reset() {
    this.initForm();
  }

add() {

  if (this.click_add) {
    this.click_add = false;
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      this.click_add = true;
      this.response.active = true;
      this.response.state = 'danger';
      this.response.message = 'Svp remplissez tout les champs';
      return;
    }
    this.response.active = false;

    this.loading = true;
    const REQ = {
      niveau: `${environment.apiUrl}niveaus/${this.code_niv}`,
      vacation: `${environment.apiUrl}vacations/${this.f.vac.value}`,
      salle: `${environment.apiUrl}salles/${this.f.salle.value}`,
      name: this.classe + " " + this.f.csalle.value + ' '+ this.f.vac.value,
      prog_id: this.f.prog_id.value,
      reprise: this.niv.reprise,
    };

    const url = `${environment.apiUrl}niveau_rels`;

    this.nServ.setData(url, REQ).pipe(first())
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
           console.log(data);
           this.loading = false;
           this.response.active = true;
           this.click_add = true;
           if (data) {
              this.response.message = "Classe relative créé avec succes";
              this.response.state = 'success';
              this.addNewNR.emit({data, io: this.io, id: this.id, in: this.in});
              this.initForm();
            } else {
              this.response.state = 'danger';
              this.response.message = "erreur serveur";
            }
        },
        error => {
          this.click_add = true;
          this.response.active = true;
          this.response.state = 'danger';
          this.response.message = error;
          this.loading = false;
        }
      );

  }

}

}
