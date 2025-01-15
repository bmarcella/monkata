import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigStudentPaiementComponent } from './config-student-paiement.component';

describe('ConfigStudentPaiementComponent', () => {
  let component: ConfigStudentPaiementComponent;
  let fixture: ComponentFixture<ConfigStudentPaiementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigStudentPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStudentPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
