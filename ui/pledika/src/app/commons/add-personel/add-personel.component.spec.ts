import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPersonelComponent } from './add-personel.component';

describe('AddPersonelComponent', () => {
  let component: AddPersonelComponent;
  let fixture: ComponentFixture<AddPersonelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
