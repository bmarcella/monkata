import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PersonelComponent } from './personel.component';

describe('PersonelComponent', () => {
  let component: PersonelComponent;
  let fixture: ComponentFixture<PersonelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
