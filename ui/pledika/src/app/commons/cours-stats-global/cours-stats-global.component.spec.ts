import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursStatsGlobalComponent } from './cours-stats-global.component';

describe('CoursStatsGlobalComponent', () => {
  let component: CoursStatsGlobalComponent;
  let fixture: ComponentFixture<CoursStatsGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursStatsGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursStatsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
