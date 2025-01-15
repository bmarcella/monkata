import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEtabComponent } from './set-etab.component';

describe('SetEtabComponent', () => {
  let component: SetEtabComponent;
  let fixture: ComponentFixture<SetEtabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetEtabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetEtabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
