export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
  employees: number;
  status: 'active' | 'inactive';
  location: string;
  joinedDate: string;
}