import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SexeStatComponent } from './sexe-stat.component';

describe('SexeStatComponent', () => {
  let component: SexeStatComponent;
  let fixture: ComponentFixture<SexeStatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SexeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
