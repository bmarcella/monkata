import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelentiteComponent } from './delentite.component';

describe('DelentiteComponent', () => {
  let component: DelentiteComponent;
  let fixture: ComponentFixture<DelentiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelentiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelentiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
