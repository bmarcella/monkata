import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcadComponent } from './acad.component';

describe('AcadComponent', () => {
  let component: AcadComponent;
  let fixture: ComponentFixture<AcadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
