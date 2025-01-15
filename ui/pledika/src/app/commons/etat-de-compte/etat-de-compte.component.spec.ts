import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EtatDeCompteComponent } from './etat-de-compte.component';

describe('EtatDeCompteComponent', () => {
  let component: EtatDeCompteComponent;
  let fixture: ComponentFixture<EtatDeCompteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatDeCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatDeCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
