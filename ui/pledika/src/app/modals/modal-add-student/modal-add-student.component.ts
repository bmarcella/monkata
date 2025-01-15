import { Component, OnInit, Input } from '@angular/core';
import { NiveauService } from 'src/app/_Services/NiveauService';
import { first } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';
import { AppService } from 'src/app/_Services/app.service';

@Component({
  selector: 'app-modal-add-student',
  templateUrl: './modal-add-student.component.html',
  styleUrls: ['./modal-add-student.component.css']
})
export class ModalAddStudentComponent implements OnInit {
  constructor(public nServ: AppService, public studServ: StudentsService,
              private route: ActivatedRoute,
              private router: Router, private fb: UntypedFormBuilder) {}

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
  @Input() niv: string;
  @Input() option: string;
  @Input() dom: string;
  @Input() classe: string;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.fb.group({
      pnom: ['', Validators.required],
      lastName: ['', Validators.required],
      last_etab: [''],
      last_year: [''],
      last_moyen: [],
      nom_ass: [''],
      adresse_ass: [''],
      phone_ass: [''],
      sexe: ['M', Validators.required],
      date_de_naiss: ['', Validators.required],
      ref: [''],
      username: ['', Validators.required],
      lieu: [(this.villes.length>0) ? this.villes[0].id : "", Validators.required],
      is_double: [false, Validators.required]
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
        this.response.state  =   'danger';
        this.response.message = 'Svp remplissez tout les champs';
        return;
    }
    this.response.active = false;

    this.loading = true;
    const user = {
      fname: this.f.pnom.value,
      lname: this.f.lastName.value,
      last_etab: this.f.last_etab.value,
      last_year: this.f.last_year.value,
      last_moyen: this.f.last_moyen.value,
      nom_ass: this.f.nom_ass.value,
      phone_ass: this.f.phone_ass.value,
      adresse_ass: this.f.adresse_ass.value,
      sexe: this.f.sexe.value,
      date_de_naiss: this.f.date_de_naiss.value,
      reference: this.f.ref.value,
      arefaire:   this.f.is_double.value,
      code_class: this.niv,
      username:    this.f.username.value,
      id_ville_ln: this.f.lieu.value
   };

    this.studServ.addStudent(user).pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          this.response.active = true;
          this.click_add = true;
          if (!data.crash) {
              console.log(data);
              this.response.state = 'success';
              this.response.message = data.message;
              this.router.navigate(['app/createdDoc', data.data.id,1]);
           } else {
              this.response.state = 'danger';
              this.response.message = data.message;
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
