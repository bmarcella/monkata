import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsWsComponent } from './results-ws.component';

describe('ResultsWsComponent', () => {
  let component: ResultsWsComponent;
  let fixture: ComponentFixture<ResultsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
