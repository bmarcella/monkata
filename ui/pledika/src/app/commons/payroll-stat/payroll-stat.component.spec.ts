import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollStatComponent } from './payroll-stat.component';

describe('PayrollStatComponent', () => {
  let component: PayrollStatComponent;
  let fixture: ComponentFixture<PayrollStatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
