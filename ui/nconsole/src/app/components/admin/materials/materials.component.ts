import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface Material {
  id: number;
  name: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
  assignedTo: string;
  status: 'available' | 'low' | 'out';
  lastUpdated: string;
}

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {
  activeTab = 'inventory';
  
  tabs = [
    { id: 'inventory', name: 'Inventory', icon: 'bi-box-seam' },
    { id: 'assigned', name: 'Assigned Items', icon: 'bi-person-check' },
    { id: 'requests', name: 'Requests', icon: 'bi-hand-index' },
    { id: 'returns', name: 'Returns', icon: 'bi-arrow-return-left' },
    { id: 'history', name: 'History', icon: 'bi-clock-history' }
  ];

  materials: Material[] = [
    {
      id: 1,
      name: 'Laptop Dell XPS',
      category: 'Electronics',
      totalQuantity: 50,
      availableQuantity: 15,
      assignedTo: 'IT Department',
      status: 'available',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'Office Chair',
      category: 'Furniture',
      totalQuantity: 100,
      availableQuantity: 5,
      assignedTo: 'Facilities',
      status: 'low',
      lastUpdated: '2024-01-14'
    },
    {
      id: 3,
      name: 'Monitor 27"',
      category: 'Electronics',
      totalQuantity: 75,
      availableQuantity: 0,
      assignedTo: 'IT Department',
      status: 'out',
      lastUpdated: '2024-01-13'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}