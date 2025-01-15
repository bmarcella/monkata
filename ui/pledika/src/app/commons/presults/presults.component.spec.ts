import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PresultsComponent } from './presults.component';

describe('PresultsComponent', () => {
  let component: PresultsComponent;
  let fixture: ComponentFixture<PresultsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PresultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
