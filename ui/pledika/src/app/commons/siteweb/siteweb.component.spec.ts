import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SitewebComponent } from './siteweb.component';

describe('SitewebComponent', () => {
  let component: SitewebComponent;
  let fixture: ComponentFixture<SitewebComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SitewebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitewebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
