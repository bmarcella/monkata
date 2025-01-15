import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinEmptyComponent } from './bulletin-empty.component';

describe('BulletinEmptyComponent', () => {
  let component: BulletinEmptyComponent;
  let fixture: ComponentFixture<BulletinEmptyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
