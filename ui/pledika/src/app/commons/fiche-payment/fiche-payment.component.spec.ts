import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FichePaymentComponent } from './fiche-payment.component';

describe('FichePaymentComponent', () => {
  let component: FichePaymentComponent;
  let fixture: ComponentFixture<FichePaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
