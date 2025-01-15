import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoursDetailsComponent } from './cours-details.component';

describe('CoursDetailsComponent', () => {
  let component: CoursDetailsComponent;
  let fixture: ComponentFixture<CoursDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
