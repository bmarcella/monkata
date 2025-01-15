import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClasseDetailsComponent } from './classe-details.component';

describe('ClasseDetailsComponent', () => {
  let component: ClasseDetailsComponent;
  let fixture: ComponentFixture<ClasseDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
