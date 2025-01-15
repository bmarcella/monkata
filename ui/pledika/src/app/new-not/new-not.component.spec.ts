import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewNotComponent } from './new-not.component';

describe('NewNotComponent', () => {
  let component: NewNotComponent;
  let fixture: ComponentFixture<NewNotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewNotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewNotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
