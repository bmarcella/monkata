import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { categoriesList, defaultList, regionList } from 'src/app/shared/models/home5.model';
import { listingListSidebar } from 'src/app/shared/models/listing-list-sidebar.model';

@Component({
  selector: 'app-listing-list-sidebar',
  templateUrl: './listing-list-sidebar.component.html',
  styleUrls: ['./listing-list-sidebar.component.css'],
})
export class ListingListSidebarComponent {
  public routes = routes;
  public listsidebar: listingListSidebar[] = [];
  public categories: categoriesList[]= [];
  public region: regionList[] =[];
  public default: defaultList[] =[];
  categoriesDataSource = new MatTableDataSource<categoriesList>();
  searchInputCategory!: string;
  selectedCategory = '';
  selectedRegion ='';
  selectedDefault ='';
  slidevalue = 55;

  constructor(private Dataservice: DataService) {
    this.listsidebar = this.Dataservice.listsidebarList;
    this.categories = this.Dataservice.categoriesList;
    this.region = this.Dataservice.regionList;
    this.default = this.Dataservice.defaultList;
    this.categoriesDataSource = new MatTableDataSource<categoriesList>(this.categories);
  }
  searchCategory(value: string): void {
    const filterValue = value;
    this.categoriesDataSource.filter = filterValue.trim().toLowerCase();
    this.categories = this.categoriesDataSource.filteredData;
  }
}
