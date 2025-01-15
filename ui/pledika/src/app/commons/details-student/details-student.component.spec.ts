import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsStudentComponent } from './details-student.component';

describe('DetailsStudentComponent', () => {
  let component: DetailsStudentComponent;
  let fixture: ComponentFixture<DetailsStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
