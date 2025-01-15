import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MnotsComponent } from './mnots.component';

describe('MnotsComponent', () => {
  let component: MnotsComponent;
  let fixture: ComponentFixture<MnotsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MnotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
