import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  activeTab = 'employees';
  searchTerm = '';
  selectedDepartment = '';
  selectedStatus = '';
  
  tabs = [
    { id: 'employees', name: 'Employees', icon: 'bi-people' },
    { id: 'orgChart', name: 'Org Chart', icon: 'bi-diagram-3' },
    { id: 'onboarding', name: 'Onboarding', icon: 'bi-person-plus' },
    { id: 'offboarding', name: 'Offboarding', icon: 'bi-person-dash' },
    { id: 'helpdesk', name: 'HR Help Desk', icon: 'bi-headset' },
    { id: 'reports', name: 'Reports', icon: 'bi-file-earmark-bar-graph' },
    { id: 'announcements', name: 'Announcements', icon: 'bi-megaphone' },
    { id: 'settings', name: 'Settings', icon: 'bi-gear' }
  ];

  employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      department: 'Engineering',
      email: 'john.doe@company.com',
      status: 'active',
      joinDate: '2023-06-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Marketing Manager',
      department: 'Marketing',
      email: 'jane.smith@company.com',
      status: 'active',
      joinDate: '2023-04-10'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Sales Representative',
      department: 'Sales',
      email: 'mike.johnson@company.com',
      status: 'inactive',
      joinDate: '2023-02-20'
    }
  ];

  departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  statuses = ['active', 'inactive'];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  getFilteredEmployees() {
    return this.employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          emp.position.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          emp.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesDepartment = !this.selectedDepartment || emp.department === this.selectedDepartment;
      const matchesStatus = !this.selectedStatus || emp.status === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.selectedStatus = '';
  }
}