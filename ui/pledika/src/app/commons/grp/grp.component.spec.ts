import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRPComponent } from './grp.component';

describe('GRPComponent', () => {
  let component: GRPComponent;
  let fixture: ComponentFixture<GRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
