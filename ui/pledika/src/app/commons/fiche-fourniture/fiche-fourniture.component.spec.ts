import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FicheFournitureComponent } from './fiche-fourniture.component';

describe('FicheFournitureComponent', () => {
  let component: FicheFournitureComponent;
  let fixture: ComponentFixture<FicheFournitureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheFournitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheFournitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
