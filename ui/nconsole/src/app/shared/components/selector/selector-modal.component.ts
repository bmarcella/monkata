import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Application, Business, SelectionState } from '../../../../../../../common/index/data/types';
import { AppEvent } from '../../../service/Event';
import { EventBusService } from '../../../service/event-bus.service';
import { KeycloakService } from '../../../service/keycloak.service';
import { ApplicationCardComponent } from './application-card.component';
import { BusinessCardComponent } from './business-card.component';
import { SelectionDropdownComponent } from './selection-dropdown.component';
import { SelectorFooterComponent } from './selector-footer.component';
import { SelectorHeaderComponent } from './selector-header.component';

@Component({
  selector: 'app-selector-modal',
  standalone: true,
  imports: [
    NgIf,
    BusinessCardComponent,
    ApplicationCardComponent,
    SelectorHeaderComponent,
    SelectorFooterComponent,
    SelectionDropdownComponent
  ],
  template: `
  <div   class="modal fade {{ class }} " style=" display: {{ display }}; background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg">
          <app-selector-header></app-selector-header>
          
          <div class="modal-body bg-white p-4">
            <div class="row g-4">
              <!-- Business Selection -->
              <div class="col-md-6">
                <h5 class="mb-3 text-dark">Select Business</h5>
                <app-selection-dropdown
                  [items]="businesses"
                  placeholder="Choose business..."
                  [(selected)]="state.selectedBusiness"
                  (selectedChange)="onBusinessChange($event)">
                </app-selection-dropdown>
                <div class="card-container" *ngIf="state.selectedBusiness">
                  <app-business-card [business]="state.selectedBusiness"></app-business-card>
                </div>
              </div>

              <!-- Application Selection -->
              <div class="col-md-6">
                <h5 class="mb-3 text-dark">Select Application</h5>
                <app-selection-dropdown
                  [items]="applications"
                  placeholder="Choose application..."
                  [(selected)]="state.selectedApplication"
                  (selectedChange)="onApplicationChange($event)">
                </app-selection-dropdown>
                <div class="card-container" *ngIf="state.selectedApplication">
                  <app-application-card [application]="state.selectedApplication"></app-application-card>
                </div>
              </div>
            </div>
          </div>

          <app-selector-footer
            [disabled]="!isSelectionComplete()"
            (confirm)="onConfirm($event)"
            (logout)="onLogout()">
          </app-selector-footer>

        </div>
      </div>
    </div>
   
  `,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1050;
    }

    .modal-content {
      background-color: white;
    }

    h5 {
      font-weight: 600;
    }

    .card-container {
      min-height: 120px;
      display: flex;
    }

    .card-container > * {
      flex: 1;
    }
  `]
})
export class SelectorModalComponent implements OnDestroy, OnInit {
  
  @Input() businesses: Business [] = [] ;
  @Input() applications: Application[]=[];
  @Output()confirm: any = new EventEmitter<any>();
  @Input() $modal: Subject<Boolean> | undefined;

  // active ent and app

  cEnt: any ;
  cApp: any ;

  @Input() class: string = "hide";
  state: SelectionState = {};
  display = "block";
  constructor(
      private router: Router,
      private auth: KeycloakService,
      private event: EventBusService,
      private cdRef: ChangeDetectorRef
    ) {
  
    }
  $timer: any;
  ngOnInit(): void {
     this.event.$on(AppEvent.SHOW_MODAL_APP, (data: any) => {
     
     this.display = "none";
     this.class = "hide";
     console.log(data);

     this.cEnt = data.ent;
     this.cApp= data.app;

     this.$timer = setTimeout(()=>{
          this.display = "block";
          this.class = "show";
          this.modal();
          this.cdRef.detectChanges();
          clearTimeout(this.$timer);
        }, 24)
     });
  }

  modal(){
    if ( this.cEnt) {
      const index = this.businesses.findIndex((item: any)=> item.id == this.cEnt.id);
      this.onBusinessChange(this.businesses[index]);
    }

    if ( this.cApp) {
     const index = this.applications.findIndex((item: any)=> item.name == this.cApp.name);
     this.onApplicationChange(this.applications[index]);
    }
  }

  ngOnDestroy(): void {
    this.$modal?.unsubscribe();
  }

  onBusinessChange(business: Business) {
    this.state.selectedBusiness = business;
    this.state.selectedBusiness.logo = this.auth.getLogo(business.id as number);
  }

  onApplicationChange(application: Application) {
    this.state.selectedApplication = application;
  }

  isSelectionComplete(): boolean {
    return !!this.state.selectedBusiness && !!this.state.selectedApplication;
  }

  onConfirm(event: any ) {
    this.confirm.emit({ state  : this.state, event });
  }

  onLogout() {
    this.auth.forceLogout();
    this.router.navigate(['/']);
  }
}