import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FicheComponent } from './fiche.component';

describe('FicheComponent', () => {
  let component: FicheComponent;
  let fixture: ComponentFixture<FicheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
