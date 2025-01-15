import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddStudentToPromoComponent } from './add-student-to-promo.component';

describe('AddStudentToPromoComponent', () => {
  let component: AddStudentToPromoComponent;
  let fixture: ComponentFixture<AddStudentToPromoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentToPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentToPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
