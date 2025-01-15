import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-prof',
  templateUrl: './add-prof.component.html',
  styleUrls: ['./add-prof.component.css']
})
export class AddProfComponent implements OnInit {
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
  // tslint:disable-next-line: variable-name
  click_add = true;
  var: any;
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addForm = this.fb.group({
      pnom: ['', Validators.required],
      lastName: ['', Validators.required],
      sexe: ['', Validators.required],
      date_de_naiss: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      salary: [''],
      adresse: [''],
    });
  }

  reset() {
    this.initForm();
  }

genEmail() {
   let nom = (this.f.pnom.value + this.f.lastName.value).replace(/\s/g, "").toLowerCase().trim()+"@" + "pledika.com";
   nom = nom.toLowerCase();
   this.addForm.controls['username'].setValue(nom);
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
      const user = {
        fname: this.f.pnom.value,
        lname: this.f.lastName.value,
        sexe: this.f.sexe.value,
        date_de_naiss: this.f.date_de_naiss.value,
        username: this.f.username.value,
        phone: this.f.phone.value,
        enabled: true,
        salairy: this.f.salary.value,
        adresse: this.f.adresse.value,
        fonction:'Enseignant(e)'
      };

      this.studServ
        .addProf(user)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            this.response.active = true;
            this.click_add = true;
            if (!data.crash) {
              this.response.state = 'success';
              this.response.message = 'Insertion effectués avec succés';
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
