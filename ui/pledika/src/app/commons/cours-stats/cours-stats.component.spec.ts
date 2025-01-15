import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursStatsComponent } from './cours-stats.component';

describe('CoursStatsComponent', () => {
  let component: CoursStatsComponent;
  let fixture: ComponentFixture<CoursStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
