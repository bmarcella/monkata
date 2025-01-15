import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

interface Tab {
  id: string;
  name: string;
  icon?: string;
}

@Component({
  selector: 'app-tab-nav',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item" *ngFor="let tab of tabs">
        <a class="nav-link" 
           [ngClass]="{'active': activeTab === tab.id}"
           (click)="onTabChange(tab.id)">
          <i *ngIf="tab.icon" class="bi {{tab.icon}} me-2"></i>
          {{tab.name}}
        </a>
      </li>
    </ul>
  `,
  styleUrls: ['./tab-nav.component.css']
})
export class TabNavComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab: string = '';
  @Output() tabChange = new EventEmitter<string>();

  onTabChange(tabId: string) {
    this.tabChange.emit(tabId);
  }
}