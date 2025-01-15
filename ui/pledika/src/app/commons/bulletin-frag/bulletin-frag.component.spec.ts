import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BulletinFragComponent } from './bulletin-frag.component';

describe('BulletinFragComponent', () => {
  let component: BulletinFragComponent;
  let fixture: ComponentFixture<BulletinFragComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinFragComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinFragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
