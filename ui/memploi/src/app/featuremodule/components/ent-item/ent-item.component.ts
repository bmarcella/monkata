import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ent-item',
  templateUrl: './ent-item.component.html',
  styleUrls: ['./ent-item.component.scss']
})
export class EntItemComponent {

  @Input()
  job: any;

  @Input()
  cjob: any | undefined;
}
