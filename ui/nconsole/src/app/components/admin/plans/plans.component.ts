import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { Plan } from '../../../interfaces/plan.interface';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {
  plans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      billingCycle: 'monthly',
      status: 'inactive',
      features: [
        '5 Team Members',
        '10GB Storage',
        'Basic Support',
        'Email Integration'
      ],
      maxUsers: 5,
      maxStorage: '10GB'
    },
    {
      id: 2,
      name: 'Professional',
      price: 99,
      billingCycle: 'monthly',
      status: 'active',
      features: [
        '20 Team Members',
        '50GB Storage',
        'Priority Support',
        'Advanced Analytics',
        'Custom Integration'
      ],
      maxUsers: 20,
      maxStorage: '50GB'
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 299,
      billingCycle: 'monthly',
      status: 'inactive',
      features: [
        'Unlimited Team Members',
        '500GB Storage',
        '24/7 Support',
        'Advanced Security',
        'Custom Development',
        'Dedicated Manager'
      ],
      maxUsers: -1,
      maxStorage: '500GB'
    }
  ];

  setActivePlan(planId: number) {
    this.plans = this.plans.map(plan => ({
      ...plan,
      status: plan.id === planId ? 'active' : 'inactive'
    }));
  }
}