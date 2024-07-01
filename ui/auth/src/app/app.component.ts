import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventBusService } from './service/event-bus.service';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { EventData } from './shared/models/event.class';
import { Router } from '@angular/router';
import { KeycloakService } from './service/keycloak.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Monkata';
  private onDestroy$ = new Subject<void>();
  constructor(private eventBus: EventBusService, public router: Router, private auth: KeycloakService) { }

  ngOnInit() {
    this.eventBus.on().pipe(
      takeUntil(this.onDestroy$),
      filter((e: EventData) => e.name === "logout"),
      map((e: EventData) => e["value"])).subscribe(this.handleMyEvent.bind(this));
  }

  handleMyEvent(value: any) {
    this.auth.forceLogout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
