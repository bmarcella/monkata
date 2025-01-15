import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromoStudentComponent } from './promo-student.component';

describe('PromoStudentComponent', () => {
  let component: PromoStudentComponent;
  let fixture: ComponentFixture<PromoStudentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
