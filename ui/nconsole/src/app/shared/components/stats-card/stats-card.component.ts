import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="card">
      <div class="card-body">
        <div class="d-flex align-items-center">
          <div class="stats-icon" [ngClass]="'bg-' + color">
            <i class="bi {{icon}}"></i>
          </div>
          <div class="ms-3">
            <p class="mb-1 text-muted">{{label}}</p>
            <h4 class="mb-0">{{value}}</h4>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stats-icon i {
      font-size: 1.5rem;
      color: white;
    }
  `]
})
export class StatsCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() icon!: string;
  @Input() color: string = 'primary';
}