import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategorieService } from 'src/app/service/categorie.service';
import { categories } from '../../shared/models/categories.model';
import { Categorie } from 'src/app/shared/models/Categorie';
export const Type_Categorie = ['Poste', 'Entreprise']
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  type_ent  = [
    { value: '', viewValue: 'Aucun' },
    { value: 'services', viewValue: 'Services' },
    { value: 'produit', viewValue: 'Produits' },
  ];

  categorie = {
    name: '',
    icon: '',
    description: '',
    type: '',
    parent:'',
    type_ent:''
  };

  types = Type_Categorie ;

  categories!: Categorie[];
  constructor(private app: CategorieService) { }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.app.show().then((r)=>{
      this.categories = r;
    }).catch((e) =>console.log(e));
  }

  delete(e: any) {
    this.app.delete(e.id).then((r)=>{
    this.categories.splice(e.index,1);
    }).catch((e) =>console.log(e));
  }

  onSubmit(form: any) {
      this.app.add(form).then((r)=>{
        this.categories.push(r);
      }).catch((e) =>console.log(e));
  }

}
