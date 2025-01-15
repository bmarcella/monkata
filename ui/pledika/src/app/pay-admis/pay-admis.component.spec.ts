import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayAdmisComponent } from './pay-admis.component';

describe('PayAdmisComponent', () => {
  let component: PayAdmisComponent;
  let fixture: ComponentFixture<PayAdmisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayAdmisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayAdmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
