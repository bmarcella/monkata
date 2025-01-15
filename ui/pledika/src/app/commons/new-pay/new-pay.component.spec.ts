import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewPayComponent } from './new-pay.component';

describe('NewPayComponent', () => {
  let component: NewPayComponent;
  let fixture: ComponentFixture<NewPayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
