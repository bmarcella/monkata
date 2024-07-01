import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  public routes = routes;
  public toggleData = false;
  public toggle = false;

  togglePassword() {
    this.toggleData = !this.toggleData;
  }
  icon() {
    this.toggle = !this.toggle;
  }
}
