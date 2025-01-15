import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinGenAllComponent } from './bulletin-gen-all.component';

describe('BulletinGenAllComponent', () => {
  let component: BulletinGenAllComponent;
  let fixture: ComponentFixture<BulletinGenAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinGenAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinGenAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
