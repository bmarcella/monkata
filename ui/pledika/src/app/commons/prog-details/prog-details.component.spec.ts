import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgDetailsComponent } from './prog-details.component';

describe('ProgDetailsComponent', () => {
  let component: ProgDetailsComponent;
  let fixture: ComponentFixture<ProgDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
