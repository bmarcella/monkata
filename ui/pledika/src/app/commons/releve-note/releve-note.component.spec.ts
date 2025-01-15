import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveNoteComponent } from './releve-note.component';

describe('ReleveNoteComponent', () => {
  let component: ReleveNoteComponent;
  let fixture: ComponentFixture<ReleveNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleveNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
