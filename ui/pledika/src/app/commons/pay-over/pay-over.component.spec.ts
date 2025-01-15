import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayOverComponent } from './pay-over.component';

describe('PayOverComponent', () => {
  let component: PayOverComponent;
  let fixture: ComponentFixture<PayOverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
