import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoursierComponent } from './boursier.component';

describe('BoursierComponent', () => {
  let component: BoursierComponent;
  let fixture: ComponentFixture<BoursierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoursierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoursierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
