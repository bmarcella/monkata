import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TleftComponent } from './tleft.component';

describe('TleftComponent', () => {
  let component: TleftComponent;
  let fixture: ComponentFixture<TleftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TleftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
