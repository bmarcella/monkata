import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';

interface AttendanceRecord {
  id: number;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  workHours: string;
  department: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  activeTab = 'daily';
  
  tabs = [
    { id: 'daily', name: 'Daily View', icon: 'bi-calendar-day' },
    { id: 'monthly', name: 'Monthly View', icon: 'bi-calendar-month' },
    { id: 'leaves', name: 'Leave Management', icon: 'bi-calendar-x' },
    { id: 'shifts', name: 'Shift Management', icon: 'bi-clock' },
    { id: 'overtime', name: 'Overtime', icon: 'bi-alarm' },
    { id: 'reports', name: 'Reports', icon: 'bi-graph-up' }
  ];

  attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      employeeName: 'John Doe',
      date: '2024-01-15',
      checkIn: '09:00',
      checkOut: '18:00',
      status: 'present',
      workHours: '9:00',
      department: 'Engineering'
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      date: '2024-01-15',
      checkIn: '09:15',
      checkOut: '18:30',
      status: 'late',
      workHours: '9:15',
      department: 'Marketing'
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      date: '2024-01-15',
      checkIn: '--:--',
      checkOut: '--:--',
      status: 'leave',
      workHours: '0:00',
      department: 'Sales'
    }
  ];

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }
}