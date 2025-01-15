import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { Role, ConfigSection } from '../../../interfaces/role.interface';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent {
  activeSection: string = 'roles';

  configSections: ConfigSection[] = [
    {
      id: 'roles',
      name: 'User Roles',
      icon: 'bi-shield-lock',
      description: 'Manage user roles and permissions'
    },
    {
      id: 'security',
      name: 'Security Settings',
      icon: 'bi-shield-check',
      description: 'Configure security and authentication'
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: 'bi-bell',
      description: 'Email and notification preferences'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      icon: 'bi-plug',
      description: 'Third-party service connections'
    }
  ];

  roles: Role[] = [
    {
      id: 1,
      name: 'Administrator',
      description: 'Full system access and control',
      permissions: ['create', 'read', 'update', 'delete', 'manage_users', 'manage_roles'],
      usersCount: 5,
      lastModified: '2024-01-15'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Department management and reporting',
      permissions: ['create', 'read', 'update', 'manage_users'],
      usersCount: 12,
      lastModified: '2024-01-14'
    },
    {
      id: 3,
      name: 'Employee',
      description: 'Basic access to company resources',
      permissions: ['read', 'update'],
      usersCount: 45,
      lastModified: '2024-01-10'
    }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }
}