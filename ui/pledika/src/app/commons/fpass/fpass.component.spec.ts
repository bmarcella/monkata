import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FpassComponent } from './fpass.component';

describe('FpassComponent', () => {
  let component: FpassComponent;
  let fixture: ComponentFixture<FpassComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
