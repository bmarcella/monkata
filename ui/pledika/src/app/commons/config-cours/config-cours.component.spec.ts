import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigCoursComponent } from './config-cours.component';

describe('ConfigCoursComponent', () => {
  let component: ConfigCoursComponent;
  let fixture: ComponentFixture<ConfigCoursComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
