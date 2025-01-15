import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent {
  activeTab = 'payroll';
  
  tabs = [
    { id: 'payroll', name: 'Payroll', icon: 'bi-cash-stack' },
    { id: 'payslips', name: 'Payslips', icon: 'bi-file-earmark-text' },
    { id: 'deductions', name: 'Deductions', icon: 'bi-dash-circle' },
    { id: 'benefits', name: 'Benefits', icon: 'bi-gift' },
    { id: 'extraPay', name: 'Extra Pay', icon: 'bi-plus-circle' },
    { id: 'reports', name: 'Reports', icon: 'bi-graph-up' },
    { id: 'payments', name: 'Payments', icon: 'bi-credit-card' }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}