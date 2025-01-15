import { Component, Input } from '@angular/core';
import { Business } from '../../../../../../../common/index/data/types';

@Component({
  selector: 'app-business-card',
  standalone: true,
  template: `
    <div class="card border-0 shadow-sm h-100 bg-white">
      <div class="card-body p-4">
        <div class="d-flex align-items-center">
          <img [src]="business.logo" [alt]="business.name" class="rounded-circle me-3" width="50" height="50">
          <div>
            <h5 class="card-title mb-1 text-dark">{{ business.name }}</h5>
            <p class="card-text text-muted small mb-0">{{ business.description }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s ease-in-out;
    }
    .card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class BusinessCardComponent {
  @Input() business!: Business;
}