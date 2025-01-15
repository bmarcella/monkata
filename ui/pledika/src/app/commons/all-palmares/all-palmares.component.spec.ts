import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllPalmaresComponent } from './all-palmares.component';

describe('AllPalmaresComponent', () => {
  let component: AllPalmaresComponent;
  let fixture: ComponentFixture<AllPalmaresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPalmaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPalmaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
