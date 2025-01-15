import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinFragAllComponent } from './bulletin-frag-all.component';

describe('BulletinFragAllComponent', () => {
  let component: BulletinFragAllComponent;
  let fixture: ComponentFixture<BulletinFragAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinFragAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinFragAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
