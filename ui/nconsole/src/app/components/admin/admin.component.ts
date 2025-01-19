import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { Application, Business } from '../../../../../../common/index/data/types';
import { ServiceApp } from '../../../../../../common/index/Frontend';
import { getURL, gWURL } from '../../../environments/environment.prod';
import { CrudService } from '../../service/crud.service';
import { DefaultAppService } from '../../service/default-app.service';
import { AppEvent } from '../../service/Event';
import { EventBusService } from '../../service/event-bus.service';
import { EventData } from '../../service/event.class';
import { KeycloakService } from '../../service/keycloak.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { SelectorModalComponent } from '../../shared/components/selector/selector-modal.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgIf, RouterOutlet, SidebarComponent, CommonModule,  FormsModule, ReactiveFormsModule, NavbarComponent, SelectorModalComponent],
  template: `
    <div class="admin-layout">
      <app-sidebar></app-sidebar>
      <main class="content">
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
       <div *ngIf="show">
         <app-selector-modal
      [class]="class"
      [applications]="categories"
      [businesses]="ents"
      (confirm)="confirm($event)"
      [$modal]="$modalListener"
    ></app-selector-modal>
       </div> 
      </main>
    </div>

    
  
  `,
  styles: [`
    .admin-layout {
      display: flex;
      background-color: #f8f9fa;
    }
    .content {
      flex: 1;
      margin-left: 280px;
      min-height: 100vh;
      padding: 1rem;
    }
  `]
})
export class AdminComponent implements OnInit {

    app;
    categories: Application[] = [];
    ents: Business [] = [];
    cEnt: any;
    cApp: any;
    ei = 0;
    avatar: any;
    entToken: any;
    aEnt: any;
    $modalListener: any = new Subject<Boolean>();
    show:boolean = true;
    class = "hide";
    stats = [
      { title: 'Utilisateurs', value: '', icon: 'bi-people' },
      { title: 'Entreprises', value: '', icon: 'bi-building' },
      { title: 'Jobs', value: '', icon: 'bi-briefcase' },
      { title: 'Postulants', value: '', icon: 'bi-person-check' },
      { title: 'View', value: '', icon: 'bi-eye' }
    ];
  
    constructor( private router: Router, public dApp$: DefaultAppService, private crud: CrudService,  private auth: KeycloakService, private event: EventBusService, private cdRef: ChangeDetectorRef ) {
      this.app = this.dApp$.getApp();
      this.getApp();
      this.getEnts();
    }
     
    ngOnInit(): void {
     this.init();

      this.event.$on(AppEvent.CHANGE_ENT, (data: any) => {
        this.showModal( { ent: data, app: undefined });
      });

      this.event.$on(AppEvent.CHANGE_APP, (data: any) => {
        console.log(data);
        this.showModal( { ent: undefined, app: data });
      });


    }

    showModal(data: { ent: any, app: any }){
      this.show = true;
      this.cdRef.detectChanges();
      this.cEnt = data.ent;
      this.cApp = data.app;
      this.auth.logoutEnt();
      this.event.$emit( new EventData(AppEvent.SHOW_MODAL_APP, data ));
    }

    init(){
      this.auth.getLoginEnt().then ((t)=>{
        this.entToken =  t;
          if(!t) {
            this.show = true; 
            this.class = "show";
            //this.$modalListener.next(this.show);
          } else {
             this.class="hide";
             this.show = false;
          }
      }).catch((e) => {
        console.log(e);
      });
    }
  
    confirm(e: any){
       this.cEnt = e.state.selectedBusiness;
       this.cApp = e.state.selectedApplication;
       this.Launch(e.event)
    }
  

  
    public getApp() {
      this.crud.get(gWURL("applications")).then((r) => {
        let i = 0;
        Object.entries(r).forEach(([key, value]) => {
          if ((value as ServiceApp).show){
            if (i==0){
              i++;
              this.cApp = value;
            }
           const v = value as ServiceApp;
            this.categories.push({
              
                id: '1',
                name: v.name,
                description: v.description || "",
                icon: v.img || ""
              },
            );
          }
        });
  
  
      }).catch((e) => console.log(e));
    }
  
   
  
    ucw(name: string ){
      return name.toUpperCase();
    }
  
    public getEnts() {
      const URL = getURL("memploi","cv/entreprises");
      this.crud.get(URL).then((r: any) => {
       if (r.length!=0) {
        this.stats[1].value = r.length;
        Object.entries(r).forEach(([key, value]) => {
           const v = value as any;
            this.ents.push({
                id: v.id,
                name: v.name,
                description: v.description || "",
                logo: ""
              },
            );
          
        });
  
       }
  
       
      }).catch((e) => {
        const msg = e.error.error.message;
        console.log(e, msg);
      });
    }
  
    setEnt(cEnt: any){
     this.cEnt = cEnt;
    }
  
    setApp(cApp: any){
      this.cApp = cApp;
    }
   
     Launch(e: any) {
      const URL = getURL("users","entreprise/loginEnt/"+this.cEnt.id+"/"+this.cApp.name);
      this.crud.get(URL,e).then((r: any) => {
        this.entToken = this.auth.LoginEnt(r);
        this.show = false;
        // this.$modalListener.next(false);
        this.event.$emit( new EventData(AppEvent.CHANGE_ENT_COMPLETE, this.cEnt));
        this.event.$emit( new EventData(AppEvent.CHANGE_APP_COMPLETE, this.cApp));
       }).catch((e) => {
        console.log(e);
      });
    }
  

}