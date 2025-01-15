import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HencaissementComponent } from './hencaissement.component';

describe('HencaissementComponent', () => {
  let component: HencaissementComponent;
  let fixture: ComponentFixture<HencaissementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HencaissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HencaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
