import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VacComponent } from './vac.component';

describe('VacComponent', () => {
  let component: VacComponent;
  let fixture: ComponentFixture<VacComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
