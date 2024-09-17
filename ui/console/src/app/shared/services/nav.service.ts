import {
  Injectable,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  fromEvent,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  takeUntil,
} from 'rxjs/operators';

// Menu
export interface Menu {
  headTitle1?: string;
  headTitle2?: string;
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
}

@Injectable({
  providedIn: "root",
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(window.innerWidth);

  // Search Box
  public search: boolean = false;

  // Language
  public language: boolean = false;

  // Mega Menu
  public megaMenu: boolean = false;
  public levelMenu: boolean = false;
  public megaMenuColapse: boolean = window.innerWidth < 1199 ? true : false;

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  // For Horizontal Layout Mobile
  public horizontal: boolean = window.innerWidth < 991 ? false : true;

  // Full screen
  public fullScreen: boolean = false;

  constructor(private router: Router) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, "resize")
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
          this.megaMenu = false;
          this.levelMenu = false;
        }
        if (evt.target.innerWidth < 1199) {
          this.megaMenuColapse = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
        this.megaMenu = false;
        this.levelMenu = false;
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  mp: any =  {
    title: "MEmploi",
    icon: "dashboard",
    type: "sub",
    // active: true,
    children: [
      { path: "/admin/job/show", title: "Emplois", type: "link" },
      { path: "/admin/job/recruitment", title: "Recrutements", type: "link" },
      { path: "/admin/user/show", title: "Postulants", type: "link" },
    ],
  };

  MENUITEMS: Menu[] = [
    {
      title: "Entreprise",
      icon: "dashboard",
      type: "sub",
      active: true,
      children: [
        { path: "/admin/home", title: "Dashboard", type: "link" },
        { path: "/admin/entreprise/show", title: "Configuration", type: "link" },
      ],
    },
    this.mp
    // { path: "/single-page", icon: "search", title: "Single Page",  active: false, type: "link", bookmark: true },
  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
