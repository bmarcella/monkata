import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { menuConfig } from '../../../config/menu.config';
import { KeycloakService } from '../../../service/keycloak.service';
interface MenuItem {
  name: string;
  icon: string;
  submenus: { name: string; route: string; }[];
  isOpen: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  constructor  (private auth: KeycloakService ){
     
  }
  ngOnDestroy(): void {
   this.auth.$appChange.unsubscribe();
  }

  ngOnInit() {

    this.auth.getLoginEnt().then((data: any)=>{
      if (data==undefined || !data) return this.setMenu();
      console.log("APP:",data.appEnt.appName );
      const menu = this.auth.getMenu(data.appEnt.appName);
      this.setMenu(menu);
    });
  
    this.auth.$appChange.subscribe((data: any) => {
     this.setMenu(data.menu);
    });

  }
  setMenu(data?: any){
    this.menuItems = menuConfig.menus.map((menu: any) => ({
      ...menu,
      isOpen: false
    }));
    if(data == undefined) return;
    this.menuItems.push(
      {
        ...data,
        isOpen: false
      }
    )
  }

  toggleSubmenu(item: MenuItem) {
    item.isOpen = !item.isOpen;
  }
}