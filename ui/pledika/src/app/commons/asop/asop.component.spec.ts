import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsopComponent } from './asop.component';

describe('AsopComponent', () => {
  let component: AsopComponent;
  let fixture: ComponentFixture<AsopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
