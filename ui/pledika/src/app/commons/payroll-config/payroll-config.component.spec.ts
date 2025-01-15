import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollConfigComponent } from './payroll-config.component';

describe('PayrollConfigComponent', () => {
  let component: PayrollConfigComponent;
  let fixture: ComponentFixture<PayrollConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
