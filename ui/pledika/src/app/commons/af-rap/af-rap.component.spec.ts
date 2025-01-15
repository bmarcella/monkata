import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AfRapComponent } from './af-rap.component';

describe('AfRapComponent', () => {
  let component: AfRapComponent;
  let fixture: ComponentFixture<AfRapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AfRapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfRapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
