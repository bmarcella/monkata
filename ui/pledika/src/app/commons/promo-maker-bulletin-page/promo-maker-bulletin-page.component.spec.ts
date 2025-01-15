import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoMakerBulletinPageComponent } from './promo-maker-bulletin-page.component';

describe('PromoMakerBulletinPageComponent', () => {
  let component: PromoMakerBulletinPageComponent;
  let fixture: ComponentFixture<PromoMakerBulletinPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoMakerBulletinPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoMakerBulletinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
