import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnneeDetailsComponent } from './annee-details.component';

describe('AnneeDetailsComponent', () => {
  let component: AnneeDetailsComponent;
  let fixture: ComponentFixture<AnneeDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnneeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnneeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
