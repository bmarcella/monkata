import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinGenComponent } from './bulletin-gen.component';

describe('BulletinGenComponent', () => {
  let component: BulletinGenComponent;
  let fixture: ComponentFixture<BulletinGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
