import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyPayComponent } from './my-pay.component';

describe('MyPayComponent', () => {
  let component: MyPayComponent;
  let fixture: ComponentFixture<MyPayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
