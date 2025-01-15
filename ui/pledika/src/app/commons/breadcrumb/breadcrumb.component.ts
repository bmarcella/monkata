import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';
import { AppService } from 'src/app/_Services/app.service';
import { environment } from 'src/environments/environment.prod';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  response = { state: '', message: '', active: false };
  etab: any;
  constructor(
    private authenticationService: AuthenticationService,
    private app: AppService
  ) {

  }

  ngOnInit() {
      this.etab  = JSON.parse(sessionStorage.getItem('etab'));
  }

  // convenience getter for easy access to form fields



}
