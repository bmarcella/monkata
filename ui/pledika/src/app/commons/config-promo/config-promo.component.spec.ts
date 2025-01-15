import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigPromoComponent } from './config-promo.component';

describe('ConfigPromoComponent', () => {
  let component: ConfigPromoComponent;
  let fixture: ComponentFixture<ConfigPromoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
