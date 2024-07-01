import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieViewComponent } from './categorie-view.component';

describe('CategorieViewComponent', () => {
  let component: CategorieViewComponent;
  let fixture: ComponentFixture<CategorieViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieViewComponent]
    });
    fixture = TestBed.createComponent(CategorieViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
