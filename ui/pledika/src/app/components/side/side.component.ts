import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/_Services/app.service';
import { AuthenticationService } from 'src/app/_Services/Authentification.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

  user: any;
  constructor(public nServ: AppService, private auth: AuthenticationService) {
    this.user = this.auth.currentUserValue;
  }
  ngOnInit() {
  }

}
