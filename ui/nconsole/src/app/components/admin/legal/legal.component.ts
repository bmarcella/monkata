import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface LegalDocument {
  id: number;
  title: string;
  category: string;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
}

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent {
  activeTab = 'all';
  
  tabs = [
    { id: 'all', name: 'All Documents', icon: 'bi-files' },
    { id: 'contracts', name: 'Contracts', icon: 'bi-file-earmark-text' },
    { id: 'health', name: 'Health & Safety', icon: 'bi-shield-check' },
    { id: 'privacy', name: 'Privacy', icon: 'bi-lock' },
    { id: 'labor', name: 'Labor Laws', icon: 'bi-book' },
    { id: 'policies', name: 'Company Policies', icon: 'bi-clipboard-check' }
  ];

  documents: LegalDocument[] = [
    {
      id: 1,
      title: 'Employment Contract Template',
      category: 'Contracts',
      lastUpdated: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Workplace Safety Guidelines',
      category: 'Health & Safety',
      lastUpdated: '2024-01-10',
      status: 'active'
    },
    {
      id: 3,
      title: 'Data Protection Policy',
      category: 'Privacy',
      lastUpdated: '2024-01-05',
      status: 'active'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getFilteredDocuments() {
    if (this.activeTab === 'all') {
      return this.documents;
    }
    const categoryMap: { [key: string]: string } = {
      'contracts': 'Contracts',
      'health': 'Health & Safety',
      'privacy': 'Privacy',
      'labor': 'Labor Laws',
      'policies': 'Company Policies'
    };
    return this.documents.filter(doc => doc.category === categoryMap[this.activeTab]);
  }
}