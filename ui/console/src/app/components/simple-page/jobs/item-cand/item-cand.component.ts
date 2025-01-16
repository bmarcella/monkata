import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Etat_demande } from 'src/app/shared/models/Postulants';

@Component({
  selector: 'app-item-cand',
  templateUrl: './item-cand.component.html',
  styleUrls: ['./item-cand.component.scss']
})
export class ItemCandComponent {

  @Input()
  cand: any;

  @Input()
  ccand: any;

  etatDemandeOptions = Object.values(Etat_demande);

  @Output()
  changeState : any = new EventEmitter<any>();

  selectState(e) {
    this.changeState.emit({
      id: this.cand.id,
      state: e.target.value
    });
  }

}
