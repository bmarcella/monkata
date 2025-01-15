import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaieAdmisComponent } from './paie-admis.component';

describe('PaieAdmisComponent', () => {
  let component: PaieAdmisComponent;
  let fixture: ComponentFixture<PaieAdmisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaieAdmisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaieAdmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
