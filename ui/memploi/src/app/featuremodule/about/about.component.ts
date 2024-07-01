import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { testimonialList, universitiesCompanies, accountCreation } from 'src/app/shared/models/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  public routes = routes;
  public universitiesCompanies: universitiesCompanies[] = [];
  public accountcreation: accountCreation[] = [];
  constructor(private DataService: DataService) {
    this.universitiesCompanies = this.DataService.universitiesCompanies;
    this.accountcreation = this.DataService.accountcreation;
  }

  public universitiesCompaniesOwlOptions: OwlOptions = {
    loop: true,
    margin: 24,
    nav: false,
    autoplay: true,
    smartSpeed: 2000,

    navText: [
      "<i class='fa-solid fa-angle-left'></i>",
      "<i class='fa-solid fa-angle-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },

      550: {
        items: 2,
      },
      700: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  };
}
