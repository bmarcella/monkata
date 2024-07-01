import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntItemComponent } from './ent-item.component';

describe('EntItemComponent', () => {
  let component: EntItemComponent;
  let fixture: ComponentFixture<EntItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntItemComponent]
    });
    fixture = TestBed.createComponent(EntItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
