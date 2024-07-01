import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import { DataService } from 'src/app/service/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { listSidebarList } from 'src/app/shared/models/listing-grid-sidebar.model';
import { categoriesList, defaultList, regionList } from 'src/app/shared/models/home5.model';

@Component({
  selector: 'app-listing-grid-sidebar',
  templateUrl: './listing-grid-sidebar.component.html',
  styleUrls: ['./listing-grid-sidebar.component.css'],
})
export class ListingGridSidebarComponent {
  public routes = routes;
  public listsidebar: listSidebarList[] = [];
  public categories: categoriesList[] = [];
  public region:  regionList[] =[];
  public default: defaultList[] =[];
  categoriesDataSource = new MatTableDataSource<categoriesList>();
  searchInputCategory!: string;
  selectedCategory = '';
  selectedRegion ='';
  selectedDefault ='';
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
