/* eslint-disable prefer-const */
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public routes = routes;
  public toggleData = false;
  public toggle = false;
  path: any = 'home';
  ent: any ;
  job: any;
  constructor( public router: Router, private route: ActivatedRoute, private crud: CrudService, private aUI:  AlertService ) {

  }
  ngOnInit(): void {
    this.getEntreprises();

  }

  public getEntreprises() {
    const URL = getURL("memploi","countEntAndJob");
    this.crud.get(URL).then((r) => {
    this.ent = r.count;
    console.log(r);
    }).catch((e) => console.log(e));
  }

  

  togglePassword() {
    this.toggleData = !this.toggleData;
  }
  icon() {
    this.toggle = !this.toggle;
  }


  switcher(name: any){
    this.path = name;
    this.router.navigate(['/profile', name]);
  }
}
