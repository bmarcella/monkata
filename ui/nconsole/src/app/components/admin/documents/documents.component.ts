import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface Document {
  id: number;
  title: string;
  type: string;
  createdDate: string;
  modifiedDate: string;
  status: 'active' | 'draft' | 'archived';
  author: string;
}

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  activeTab = 'all';
  
  tabs = [
    { id: 'all', name: 'All Documents', icon: 'bi-files' },
    { id: 'contracts', name: 'Contracts', icon: 'bi-file-earmark-text' },
    { id: 'policies', name: 'Policies', icon: 'bi-file-earmark-ruled' },
    { id: 'jds', name: 'Job Descriptions', icon: 'bi-file-person' },
    { id: 'templates', name: 'Templates', icon: 'bi-file-earmark-medical' },
    { id: 'archived', name: 'Archived', icon: 'bi-archive' }
  ];

  documents: Document[] = [
    {
      id: 1,
      title: 'Employment Contract Template',
      type: 'Contract',
      createdDate: '2024-01-15',
      modifiedDate: '2024-01-15',
      status: 'active',
      author: 'HR Admin'
    },
    {
      id: 2,
      title: 'Employee Handbook',
      type: 'Policy',
      createdDate: '2024-01-10',
      modifiedDate: '2024-01-14',
      status: 'active',
      author: 'HR Manager'
    },
    {
      id: 3,
      title: 'Software Developer JD',
      type: 'Job Description',
      createdDate: '2024-01-08',
      modifiedDate: '2024-01-12',
      status: 'active',
      author: 'Recruitment Lead'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getFilteredDocuments() {
    if (this.activeTab === 'all') return this.documents;
    if (this.activeTab === 'archived') {
      return this.documents.filter(doc => doc.status === 'archived');
    }
    
    const typeMap: { [key: string]: string } = {
      'contracts': 'Contract',
      'policies': 'Policy',
      'jds': 'Job Description',
      'templates': 'Template'
    };
    
    return this.documents.filter(doc => 
      doc.type === typeMap[this.activeTab] && doc.status !== 'archived'
    );
  }
}