import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FichePersComponent } from './fiche-pers.component';

describe('FichePersComponent', () => {
  let component: FichePersComponent;
  let fixture: ComponentFixture<FichePersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FichePersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichePersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
