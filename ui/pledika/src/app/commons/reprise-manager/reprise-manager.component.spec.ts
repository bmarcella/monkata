import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseManagerComponent } from './reprise-manager.component';

describe('RepriseManagerComponent', () => {
  let component: RepriseManagerComponent;
  let fixture: ComponentFixture<RepriseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepriseManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
