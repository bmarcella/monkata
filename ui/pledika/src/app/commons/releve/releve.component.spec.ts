import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReleveComponent } from './releve.component';

describe('ReleveComponent', () => {
  let component: ReleveComponent;
  let fixture: ComponentFixture<ReleveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
