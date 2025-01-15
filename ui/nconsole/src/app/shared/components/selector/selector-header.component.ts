import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selector-header',
  standalone: true,
  template: `
    <div class="modal-header border-0 py-4 bg-primary">
      <h4 class="modal-title fw-bold text-white mx-auto">{{ title }}</h4>
    </div>
  `,
  styles: [`
    .modal-header {
      background-color: var(--primary-color);
    }
    .modal-title {
      font-size: 1.5rem;
      letter-spacing: -0.025em;
    }
  `]
})
export class SelectorHeaderComponent {
  @Input() title = 'Choose Business & Application';
}