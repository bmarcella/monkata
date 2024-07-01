import { Component, OnInit } from '@angular/core';
import { ConnectionService } from "ng-connection-service";
@Component({
  selector: "app-internet",
  templateUrl: "./internet.component.html",
  styleUrls: ["./internet.component.css"],
})
export class InternetComponent implements OnInit {
  status = "ONLINE";
  isConnected = true;

  constructor(private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe((isConnected) => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
      } else {
        this.status = "OFFLINE";
      }
    });
  }
  ngOnInit() {}
}
