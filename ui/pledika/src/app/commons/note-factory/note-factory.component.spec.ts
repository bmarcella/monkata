import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoteFactoryComponent } from './note-factory.component';

describe('NoteFactoryComponent', () => {
  let component: NoteFactoryComponent;
  let fixture: ComponentFixture<NoteFactoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteFactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
