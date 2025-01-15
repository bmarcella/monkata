import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalClasseComponent } from './modal-classe.component';

describe('ModalClasseComponent', () => {
  let component: ModalClasseComponent;
  let fixture: ComponentFixture<ModalClasseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
