import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NgFor],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'bi-speedometer2',
      title: 'Fast & Modern',
      description: 'Built with the latest Angular features for optimal performance.'
    },
    {
      icon: 'bi-phone',
      title: 'Responsive Design',
      description: 'Looks great on all devices with Bootstrap\'s responsive grid.'
    },
    {
      icon: 'bi-code-slash',
      title: 'Clean Code',
      description: 'Maintainable and scalable architecture using best practices.'
    }
  ];
}