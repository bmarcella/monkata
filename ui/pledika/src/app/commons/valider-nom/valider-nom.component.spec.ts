import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderNomComponent } from './valider-nom.component';

describe('ValiderNomComponent', () => {
  let component: ValiderNomComponent;
  let fixture: ComponentFixture<ValiderNomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderNomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderNomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
