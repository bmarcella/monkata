import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { sortList } from 'src/app/shared/models/home5.model';
import {
  defaultList,
  mylistings,
} from 'src/app/shared/models/my-listings.model';

@Component({
  selector: 'app-my-listing',
  templateUrl: './my-listing.component.html',
  styleUrls: ['./my-listing.component.css'],
})
export class MyListingComponent {
  public routes = routes;
  public electronics: mylistings[] = [];
  public default: defaultList[] = [];
  public sort: sortList[] = [];
  public selectedSort: sortList[] = [];

  constructor(private DataService: DataService) {
    this.electronics = this.DataService.electronicsList;
    this.default = this.DataService.defaultList;
    this.sort = this.DataService.sortList;
  }
  public sortData(sort: Sort) {
    const data = this.electronics.slice();

    if (!sort.active || sort.direction === '') {
      this.electronics = data;
    } else {
      this.electronics = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
}
