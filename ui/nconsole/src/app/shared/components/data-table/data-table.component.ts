import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{column.header}}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data">
            <td *ngFor="let column of columns">
              <ng-container [ngTemplateOutlet]="column.template || defaultTemplate"
                          [ngTemplateOutletContext]="{ $implicit: item, column: column }">
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table td {
      vertical-align: middle;
    }
  `]
})
export class DataTableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Output() rowAction = new EventEmitter<{action: string, item: any}>();
}