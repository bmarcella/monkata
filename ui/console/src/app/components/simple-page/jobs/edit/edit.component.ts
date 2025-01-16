import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from '../../../../service/alert.service';
import { CategorieService } from '../../../../service/categorie.service';
import { CrudService } from '../../../../service/crud.service';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-edit-job',
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class EditJobComponent {

 
  constructor( public router: Router, private crud: CrudService, private aUI:  AlertService, private cat: CategorieService) {

  }
  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    
  }

 
}
