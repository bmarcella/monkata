import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinissantComponent } from './finissant.component';

describe('FinissantComponent', () => {
  let component: FinissantComponent;
  let fixture: ComponentFixture<FinissantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinissantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinissantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
