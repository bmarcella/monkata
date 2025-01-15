import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaiePageComponent } from './paie-page.component';

describe('PaiePageComponent', () => {
  let component: PaiePageComponent;
  let fixture: ComponentFixture<PaiePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaiePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
