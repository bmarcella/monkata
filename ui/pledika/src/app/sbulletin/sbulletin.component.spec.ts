import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbulletinComponent } from './sbulletin.component';

describe('SbulletinComponent', () => {
  let component: SbulletinComponent;
  let fixture: ComponentFixture<SbulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SbulletinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SbulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
