import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbBarAdminComponent } from './breadcrumb-bar-admin.component';

describe('BreadcrumbBarAdminComponent', () => {
  let component: BreadcrumbBarAdminComponent;
  let fixture: ComponentFixture<BreadcrumbBarAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbBarAdminComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbBarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
