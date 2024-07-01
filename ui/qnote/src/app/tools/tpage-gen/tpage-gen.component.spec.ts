import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPageGenComponent } from './tpage-gen.component';

describe('TPageGenComponent', () => {
  let component: TPageGenComponent;
  let fixture: ComponentFixture<TPageGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPageGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPageGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
