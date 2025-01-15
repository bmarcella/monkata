import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AERepriseComponent } from './aereprise.component';

describe('AERepriseComponent', () => {
  let component: AERepriseComponent;
  let fixture: ComponentFixture<AERepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AERepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AERepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
