import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-selector-footer',
  standalone: true,
  template: `
    <div class="modal-footer border-0 bg-white">
    <button 
        class="btn btn-danger btn-lg " 
        (click)="onLogout()">
        Déconnexion
      </button>
      <button 
        class="btn btn-primary btn-lg px-4" 
        [disabled]="disabled"
        (click)="onConfirmClick($event)">
        Launch Application
      </button>
    </div>
  `
})
export class SelectorFooterComponent {
  @Input() disabled = true;
  @Output() confirm = new EventEmitter<any>();
  @Output() logout = new EventEmitter<void>();

  onConfirmClick(event: any) {
    this.confirm.emit(event);
  }
  
  onLogout(){
    this.logout.emit();
  }
}