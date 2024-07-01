import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer-eight.component.html',
  styleUrls: ['./footer-eight.component.scss']
})
export class FooterComponent {
  public routes = routes;

}
