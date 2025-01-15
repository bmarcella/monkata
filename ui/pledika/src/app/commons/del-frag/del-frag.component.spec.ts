import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelFragComponent } from './del-frag.component';

describe('DelFragComponent', () => {
  let component: DelFragComponent;
  let fixture: ComponentFixture<DelFragComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelFragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelFragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
