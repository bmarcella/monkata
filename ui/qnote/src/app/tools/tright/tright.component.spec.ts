import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TRightComponent } from './tright.component';

describe('TRightComponent', () => {
  let component: TRightComponent;
  let fixture: ComponentFixture<TRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
