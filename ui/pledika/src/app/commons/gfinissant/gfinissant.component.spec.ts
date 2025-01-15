import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GFinissantComponent } from './gfinissant.component';

describe('GFinissantComponent', () => {
  let component: GFinissantComponent;
  let fixture: ComponentFixture<GFinissantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GFinissantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GFinissantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
