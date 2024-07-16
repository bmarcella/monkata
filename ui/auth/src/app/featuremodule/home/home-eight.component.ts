import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import * as AOS from 'aos';
import { CountUp } from 'countup.js';
import { routes } from 'src/app/core/helpers/routes/routes';
import { CrudService } from 'src/app/service/crud.service';
import {
  gWURL,
  prod,
} from 'src/environments/environment.prod';

import { ServiceApp } from '../../../../../../common/index/Frontend';

@Component({
  selector: 'app-home-eight',
  templateUrl: './home-eight.component.html',
  styleUrls: ['./home-eight.component.scss'],
})
export class HomeEightComponent implements OnInit, AfterViewInit {
  public routes = routes;
  private countUp: CountUp | undefined;
  public categories: ServiceApp[] = [];
  prod = prod;

  constructor(public router: Router, private crud: CrudService) {
  }

  ngOnInit(): void {
    AOS.init({ disable: 'mobile', duration: 1200, once: true });

    this.getApp();
  }
  ngAfterViewInit() {
    this.countUp = new CountUp('my-count-up', 0);
    this.countUp.start();
  }
  direction() {
    this.router.navigate([routes.listinggridsidebar]);
  }


  public getApp() {
    this.crud.get(gWURL("applications")).then((r) => {
      console.log(r);
      Object.entries(r).forEach(([key, value]) => {
        if ((value as ServiceApp).show)
          this.categories.push(value as ServiceApp);
      });
    }).catch((e) => console.log(e));
  }

}
