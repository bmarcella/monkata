import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PalmaresvComponent } from './palmaresv.component';

describe('PalmaresvComponent', () => {
  let component: PalmaresvComponent;
  let fixture: ComponentFixture<PalmaresvComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PalmaresvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalmaresvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
