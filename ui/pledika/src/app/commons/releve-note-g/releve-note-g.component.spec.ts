import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveNoteGComponent } from './releve-note-g.component';

describe('ReleveNoteGComponent', () => {
  let component: ReleveNoteGComponent;
  let fixture: ComponentFixture<ReleveNoteGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleveNoteGComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveNoteGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
