import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayrollFicheComponent } from './payroll-fiche.component';

describe('PayrollFicheComponent', () => {
  let component: PayrollFicheComponent;
  let fixture: ComponentFixture<PayrollFicheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
