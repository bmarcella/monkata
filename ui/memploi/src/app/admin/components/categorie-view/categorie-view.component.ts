import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Categorie } from 'src/app/shared/models/Categorie';

@Component({
  selector: 'app-categorie-view',
  templateUrl: './categorie-view.component.html',
  styleUrls: ['./categorie-view.component.scss']
})
export class CategorieViewComponent {
  @Input() categorie!: Categorie;
  @Input() index: any;
  @Output() delete = new EventEmitter<any>();

  del(id: any){
   this.delete.emit({
    id, index: this.index
   });
  }
}
