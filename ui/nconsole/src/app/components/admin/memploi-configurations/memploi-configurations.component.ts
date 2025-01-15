import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-memploi-configurations',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './memploi-configurations.component.html',
  styleUrls: ['./memploi-configurations.component.css']
})
export class MemploiConfigurationsComponent {
  activeTab = 'general';
  
  tabs = [
    { id: 'general', name: 'General Settings', icon: 'bi-gear' },
    { id: 'workflow', name: 'HR Workflows', icon: 'bi-diagram-3' },
    { id: 'templates', name: 'Document Templates', icon: 'bi-file-earmark-text' },
    { id: 'fields', name: 'Custom Fields', icon: 'bi-input-cursor' },
    { id: 'notifications', name: 'Notifications', icon: 'bi-bell' },
    { id: 'integrations', name: 'Integrations', icon: 'bi-plug' }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}