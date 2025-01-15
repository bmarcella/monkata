import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditoProfComponent } from './edito-prof.component';

describe('EditoProfComponent', () => {
  let component: EditoProfComponent;
  let fixture: ComponentFixture<EditoProfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditoProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditoProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
