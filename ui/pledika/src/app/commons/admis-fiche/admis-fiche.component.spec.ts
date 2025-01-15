import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdmisFicheComponent } from './admis-fiche.component';

describe('AdmisFicheComponent', () => {
  let component: AdmisFicheComponent;
  let fixture: ComponentFixture<AdmisFicheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmisFicheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmisFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
