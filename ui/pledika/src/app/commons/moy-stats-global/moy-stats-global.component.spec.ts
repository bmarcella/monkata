import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoyStatsGlobalComponent } from './moy-stats-global.component';

describe('MoyStatsGlobalComponent', () => {
  let component: MoyStatsGlobalComponent;
  let fixture: ComponentFixture<MoyStatsGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoyStatsGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoyStatsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
