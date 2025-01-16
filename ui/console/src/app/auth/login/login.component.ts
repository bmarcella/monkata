import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CrudService } from "src/app/service/crud.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public newUser = false;
  // public user: firebase.User;
  public show: boolean = false
  public errorMessage: any;

  constructor(public router: Router, private crud: CrudService) {
  }

  ngOnInit() {
     this.login();
  }

  public login() {
    this.crud.login();
  }

}
