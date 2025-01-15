import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionFinaleComponent } from './decision-finale.component';

describe('DecisionFinaleComponent', () => {
  let component: DecisionFinaleComponent;
  let fixture: ComponentFixture<DecisionFinaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionFinaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionFinaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
