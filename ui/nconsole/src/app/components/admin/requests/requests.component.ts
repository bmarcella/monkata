import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface Request {
  id: number;
  employeeName: string;
  type: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  department: string;
}

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  activeTab = 'all';
  
  tabs = [
    { id: 'all', name: 'All Requests', icon: 'bi-collection' },
    { id: 'vacation', name: 'Vacation', icon: 'bi-calendar-check' },
    { id: 'meetings', name: 'Meetings', icon: 'bi-people' },
    { id: 'documents', name: 'Documents', icon: 'bi-file-text' },
    { id: 'help', name: 'Help Desk', icon: 'bi-question-circle' }
  ];

  requests: Request[] = [
    {
      id: 1,
      employeeName: 'John Doe',
      type: 'Vacation',
      submittedDate: '2024-01-15',
      status: 'pending',
      priority: 'medium',
      department: 'Engineering'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      type: 'Meeting',
      submittedDate: '2024-01-14',
      status: 'approved',
      priority: 'high',
      department: 'Marketing'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      type: 'Document',
      submittedDate: '2024-01-13',
      status: 'rejected',
      priority: 'low',
      department: 'Sales'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getFilteredRequests() {
    if (this.activeTab === 'all') return this.requests;
    return this.requests.filter(request => 
      request.type.toLowerCase() === this.activeTab
    );
  }
}