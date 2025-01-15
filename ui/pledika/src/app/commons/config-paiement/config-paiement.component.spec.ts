import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigPaiementComponent } from './config-paiement.component';

describe('ConfigPaiementComponent', () => {
  let component: ConfigPaiementComponent;
  let fixture: ComponentFixture<ConfigPaiementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
