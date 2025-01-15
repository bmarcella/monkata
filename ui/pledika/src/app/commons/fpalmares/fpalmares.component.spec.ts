import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FpalmaresComponent } from './fpalmares.component';

describe('FpalmaresComponent', () => {
  let component: FpalmaresComponent;
  let fixture: ComponentFixture<FpalmaresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FpalmaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpalmaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
