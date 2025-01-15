import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EtatCompteComponent } from './etat-compte.component';

describe('EtatCompteComponent', () => {
  let component: EtatCompteComponent;
  let fixture: ComponentFixture<EtatCompteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
