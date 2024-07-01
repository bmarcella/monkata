import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeJobItemComponent } from './home-job-item.component';

describe('HomeJobItemComponent', () => {
  let component: HomeJobItemComponent;
  let fixture: ComponentFixture<HomeJobItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeJobItemComponent]
    });
    fixture = TestBed.createComponent(HomeJobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
