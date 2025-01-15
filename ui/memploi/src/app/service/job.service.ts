
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { getURL } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private crud: CrudService) { }

  getJobs() {
    const URL = getURL("memploi","getJobs");
    return this.crud.get(URL);
  }
}
