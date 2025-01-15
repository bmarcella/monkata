import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {

    constructor(
    public nServ: AppService,
    public studServ: StudentsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  // convenience getter for easy access to form fields
  get f() {
    return this.addForm.controls;
  }
  loading = false;
  lNiv = false;
  error: any;
  sNiv: any;
  stud: any;
  addForm: UntypedFormGroup;
  submitted = false;
  success = '';
  response = { state: '', message: '', active: false };
  roles = [];
  // tslint:disable-next-line: variable-name
  click_add = true;
  var: any;
   role ;
  ngOnInit() {
    this.initForm();
    this.getRoles();
  }

  getRoles() {
    const url = `${environment.apiUrl}roles`;
    this.nServ
      .getData(url)
      .pipe(first())
      .subscribe(
        (data) => {
          this.setRoles(data._embedded.roles);
        },
        (error) => {}
      );
  }
  setRoles(r) {
    r.forEach((e) => {
      if ( e.name === 'PARENT'  ) {
        this.role = e;
        console.log(e);
      }
    });
  }

  initForm() {
    this.addForm = this.fb.group({
      pnom: ['', Validators.required],
      lastName: ['', Validators.required],
      sexe: ['', Validators.required],
      date_de_naiss: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      adresse: [''],
      fonction: [''],
    });
  }
  genEmail() {
   // let nom = (this.f.pnom.value + this.f.lastName.value).trim() + "@" + "pledika.com";
    let nom = (this.f.pnom.value + this.f.lastName.value).replace(/\s/g, '').toLowerCase().trim() + '@' + 'pledika.com';
    nom = nom.toLowerCase();
    this.addForm.controls.username.setValue(nom);
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
      // tslint:disable-next-line: one-variable-per-declaration
      const user = {
        fname: this.f.pnom.value,
        lname: this.f.lastName.value,
        sexe: this.f.sexe.value,
        date_de_naiss: this.f.date_de_naiss.value,
        username: this.f.username.value,
        role:    this.role.id,
        phone:   this.f.phone.value,
        adresse: this.f.adresse.value,
        fonction: this.f.fonction.value,
        enabled: true
      };

      this.studServ
        .addNParent(user)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            this.click_add = true;
            if (!data.crash) {
              this.response.state = 'success';
              this.response.message = data.message;
            } else {
              this.response.state = 'danger';
              this.response.message = data.message;
            }
          },
          (error) => {
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
