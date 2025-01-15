import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetudiantsComponent } from './petudiants.component';

describe('PetudiantsComponent', () => {
  let component: PetudiantsComponent;
  let fixture: ComponentFixture<PetudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetudiantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
