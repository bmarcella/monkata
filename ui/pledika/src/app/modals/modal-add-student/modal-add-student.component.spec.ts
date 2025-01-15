import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAddStudentComponent } from './modal-add-student.component';

describe('ModalAddStudentComponent', () => {
  let component: ModalAddStudentComponent;
  let fixture: ComponentFixture<ModalAddStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
