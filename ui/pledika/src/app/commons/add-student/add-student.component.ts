import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { StudentsService } from 'src/app/_Services/StudentsService';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
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
  niv = [];
  cniv: any;
  stud: any;
  addForm: UntypedFormGroup;
  submitted = false;
  success = "";
  response = { state: "", message: "", active: false };
  villes: any;
  // tslint:disable-next-line: variable-name
  click_add = true;
  var: any;
  ngOnInit() {
    this.getContext();
    this.getNiveau();
  }

  prev() {
    this.cniv = null;
  }

  getNiveau() {
    this.nServ
      .getData(`${environment.apiUrl}niveaus`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.niv = data._embedded.niveaus;
        },
        (error) => {}
      );
  }

  getContext() {
    this.nServ
      .getData(`${environment.apiUrl}context`)
      .pipe(first())
      .subscribe(
        (data) => {
          this.villes = data.data.vis;
          this.initForm();
        },
        (error) => {}
      );
  }

  initForm() {
    this.addForm = this.fb.group({
      pnom: ["", Validators.required],
      lastName: ["", Validators.required],
      last_etab: [""],
      last_year: [""],
      last_moyen: [""],
      nom_ass: [""],
      adresse_ass: [""],
      phone_ass: [""],
      sexe: ["", Validators.required],
      date_de_naiss: ["", Validators.required],
      ref: [""],
      username: ["", Validators.required],
      lieu: [ (this.villes.length>0) ? this.villes[0].id : "", Validators.required],
      is_double: [false, Validators.required],
    });
  }

  reset() {
    this.initForm();
  }

  genEmail() {
    let nom = (this.f.pnom.value + this.f.lastName.value).replace(/\s/g, "").toLowerCase().trim()+"@" + "pledika.com";
    nom = nom.toLowerCase();
    this.addForm.controls["username"].setValue(nom);
  }

  add() {
    if (this.click_add) {
      this.click_add = false;
      this.submitted = true;
      // stop here if form is invalid
      if (this.addForm.invalid) {
        this.click_add = true;
        this.response.active = true;
        this.response.state = "danger";
        this.response.message = "Svp remplissez tout les champs";
        return;
      }
      if (this.f.lieu.value == undefined || this.f.lieu.value == "") {
          this.click_add = true;
          this.response.active = true;
          this.response.state = "danger";
          this.response.message = "Svp ajouter lieu de naissance";
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
        arefaire: this.f.is_double.value,
        code_class: this.cniv.code,
        username: this.f.username.value,
        id_ville_ln: this.f.lieu.value,
        enabled: true,
      };
      this.studServ.addStudent(user).pipe(first())
        .subscribe(
          (data) => {
            this.loading = false;
            this.response.active = true;
            this.click_add = true;
            if (!data.crash) {
              this.response.state = "success";
              this.response.message = data.message;
              this.reset();
            } else {
              this.response.state = "danger";
              this.response.message = data.message;
            }
          },
          (error) => {
            this.click_add = true;
            this.response.active = true;
            this.response.state = "danger";
            this.response.message = error;
            this.loading = false;
          }
        );
    }
  }
}
