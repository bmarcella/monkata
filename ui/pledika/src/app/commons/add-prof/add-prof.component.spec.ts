import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddProfComponent } from './add-prof.component';

describe('AddProfComponent', () => {
  let component: AddProfComponent;
  let fixture: ComponentFixture<AddProfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
