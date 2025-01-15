import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReussiteComponent } from './reussite.component';

describe('ReussiteComponent', () => {
  let component: ReussiteComponent;
  let fixture: ComponentFixture<ReussiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReussiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReussiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
