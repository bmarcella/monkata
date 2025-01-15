import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeOPassComponent } from './change-opass.component';

describe('ChangeOPassComponent', () => {
  let component: ChangeOPassComponent;
  let fixture: ComponentFixture<ChangeOPassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
