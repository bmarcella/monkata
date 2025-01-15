export interface Plan {
  id: number;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'inactive';
  features: string[];
  maxUsers: number;
  maxStorage: string;
}