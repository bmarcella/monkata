import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FounitureComponent } from './founiture.component';

describe('FounitureComponent', () => {
  let component: FounitureComponent;
  let fixture: ComponentFixture<FounitureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FounitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FounitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
