import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailsProfComponent } from './details-prof.component';

describe('DetailsProfComponent', () => {
  let component: DetailsProfComponent;
  let fixture: ComponentFixture<DetailsProfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
