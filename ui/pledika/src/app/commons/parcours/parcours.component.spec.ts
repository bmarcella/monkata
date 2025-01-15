import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ParcoursComponent } from './parcours.component';

describe('ParcoursComponent', () => {
  let component: ParcoursComponent;
  let fixture: ComponentFixture<ParcoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
