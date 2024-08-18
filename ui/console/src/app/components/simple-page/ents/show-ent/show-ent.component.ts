import { Component } from '@angular/core';
import { AlertService } from 'src/app/service/alert.service';
import { CrudService } from 'src/app/service/crud.service';
import { getURL } from 'src/environments/environment.prod';
declare var require
const Swal = require('sweetalert2')

@Component({
  selector: 'app-show-ent',
  templateUrl: './show-ent.component.html',
  styleUrl: './show-ent.component.scss'
})
export class ShowEntComponent {

  objs: any = [];
  paginations: any ;
  page = 1;
  query = '';
  asearch = false;
  constructor(  private crud: CrudService, private aUI:  AlertService) {  }


  ngOnInit() {
   this.getEnts(this.page);
  }

  public getEnts(page: number, e= undefined) {
    this.page = page;
    const URL = getURL("users",'entreprise/getEntByPage/'+page);
    this.crud.post(URL,{ query: this.query},  e).then((r: any) => {
      console.log(r);
      this.objs = r.objs;
      this.paginations = r.pagination;
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

   setApprouved(state: boolean, id: number, i: number) {
    const URL = getURL("users",'entreprise/approve/'+state+"/"+id);
    this.crud.get(URL).then((r: any) => {
      console.log(r);
      this.objs[i] = r;
      Swal.fire(
        (state) ?  "Approuvé " :  "Desapprouvé  ",
        (state) ?  "Cette entreprise a été approuvé." :  "Cette entreprise a été desapprouvé.",
        'success'
      )
    }).catch((e) => {
      const msg = e.error.error.message;
      console.log(msg);
    });
  }

  withConfirmation(state: boolean, item, i: number) {
    Swal.fire({
      title: 'Etes vous sure?',
      text: (state) ?  "Voulez-vous approuver cette entreprise '" +item.name+"'?" :  "Voulez-vous desapprouver cette entreprise '" +item.name+"' ?"  ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: (state) ?  "Apprové" :  "Desapprouvé "
    }).then((result) => {
      if (result.value) {
        this.setApprouved(state, item.id, i);
      }
    })
  }

  changePage(p, e) {
    this.getEnts(p, e);
  }

  search(e) {
    this.asearch = true;
    this.getEnts(1, e);
  }

  closeSearch(e){
    this.asearch = false;
     this.query = undefined;
     this.getEnts(1,e);
  }


}
