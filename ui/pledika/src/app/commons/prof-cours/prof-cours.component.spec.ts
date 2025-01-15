import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProfCoursComponent } from './prof-cours.component';

describe('ProfCoursComponent', () => {
  let component: ProfCoursComponent;
  let fixture: ComponentFixture<ProfCoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
