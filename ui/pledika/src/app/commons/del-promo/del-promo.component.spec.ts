import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelPromoComponent } from './del-promo.component';

describe('DelPromoComponent', () => {
  let component: DelPromoComponent;
  let fixture: ComponentFixture<DelPromoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
