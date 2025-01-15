import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PupgradeComponent } from './pupgrade.component';

describe('PupgradeComponent', () => {
  let component: PupgradeComponent;
  let fixture: ComponentFixture<PupgradeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PupgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
