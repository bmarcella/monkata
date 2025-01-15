import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RpaiementComponent } from './rpaiement.component';

describe('RpaiementComponent', () => {
  let component: RpaiementComponent;
  let fixture: ComponentFixture<RpaiementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RpaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
