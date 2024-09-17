// Services
import {
  CommonModule,
  DecimalPipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
// import { DragulaModule } from "ng2-dragula";
import { TranslateModule } from '@ngx-translate/core';

// Components
import {
  BreadcrumbComponent,
} from './components/breadcrumb/breadcrumb.component';
import {
  FeatherIconsComponent,
} from './components/feather-icons/feather-icons.component';
import { FooterComponent } from './components/footer/footer.component';
// Header Elements Components
import {
  BookmarkComponent,
} from './components/header/elements/bookmark/bookmark.component';
import {
  CartComponent,
} from './components/header/elements/cart/cart.component';
import {
  LanguagesComponent,
} from './components/header/elements/languages/languages.component';
import {
  MegaMenuComponent,
} from './components/header/elements/mega-menu/mega-menu.component';
import {
  MessageBoxComponent,
} from './components/header/elements/message-box/message-box.component';
import {
  MyAccountComponent,
} from './components/header/elements/my-account/my-account.component';
import {
  NotificationComponent,
} from './components/header/elements/notification/notification.component';
import {
  SearchComponent,
} from './components/header/elements/search/search.component';
import {
  SwiperComponent,
} from './components/header/elements/swiper/swiper.component';
import { HeaderComponent } from './components/header/header.component';
import {
  ContentComponent,
} from './components/layout/content/content.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import {
  TapToTopComponent,
} from './components/tap-to-top/tap-to-top.component';
import { LayoutService } from './services/layout.service';
import { NavService } from './services/nav.service';
import { TableService } from './services/table.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentComponent,
    BreadcrumbComponent,
    FeatherIconsComponent,
    LoaderComponent,
    TapToTopComponent,
    SearchComponent,
    MegaMenuComponent,
    LanguagesComponent,
    NotificationComponent,
    BookmarkComponent,
    CartComponent,
    MessageBoxComponent,
    MyAccountComponent,
    SvgIconComponent,
    SwiperComponent,

  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    // DragulaModule.forRoot(),
    TranslateModule.forRoot(),
    SwiperModule
  ],
  providers: [NavService, LayoutService, DecimalPipe, TableService],
  exports: [NgbModule, FormsModule, ReactiveFormsModule,
    TranslateModule,
    LoaderComponent, BreadcrumbComponent, FeatherIconsComponent, TapToTopComponent, SvgIconComponent, SwiperModule],
})
export class SharedModule {}
