import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private ent:Subject<any> = new BehaviorSubject<any>([]);


}
