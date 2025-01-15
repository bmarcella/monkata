import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollHistoryComponent } from './payroll-history.component';

describe('PayrollHistoryComponent', () => {
  let component: PayrollHistoryComponent;
  let fixture: ComponentFixture<PayrollHistoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
