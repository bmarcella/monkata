import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCandComponent } from './item-cand.component';

describe('ItemCandComponent', () => {
  let component: ItemCandComponent;
  let fixture: ComponentFixture<ItemCandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCandComponent]
    });
    fixture = TestBed.createComponent(ItemCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
