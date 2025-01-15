import { Application, Business } from "./types";


export const businesses: Business[] = [
  {
    id: '1',
    name: 'Gran Panyen',
    description: 'Artisanal Bakery & Café',
    logo: 'https://via.placeholder.com/50'
  },
  {
    id: '2',
    name: 'Memploi Services',
    description: 'Professional Employment Agency',
    logo: 'https://via.placeholder.com/50'
  }
];

export const applications: Application[] = [
  {
    id: '1',
    name: 'Dashboard',
    description: 'Business analytics and reporting',
    icon: 'bi-graph-up'
  },
  {
    id: '2',
    name: 'Inventory',
    description: 'Stock management system',
    icon: 'bi-box-seam'
  },
  {
    id: '3',
    name: 'HR Portal',
    description: 'Employee management system',
    icon: 'bi-people'
  }
];