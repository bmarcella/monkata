/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Subject, Subscription, filter, map } from 'rxjs';
import { EventData } from '../shared/models/event.class';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  constructor() { }

  emit(event: EventData) {
    this.subject$.next(event);
  }

  on() {
    return this.subject$;
  }
}
