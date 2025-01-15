import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmatComponent } from './smat.component';

describe('SmatComponent', () => {
  let component: SmatComponent;
  let fixture: ComponentFixture<SmatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
