import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSalaryComponent } from './edit-salary.component';

describe('EditSalaryComponent', () => {
  let component: EditSalaryComponent;
  let fixture: ComponentFixture<EditSalaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
