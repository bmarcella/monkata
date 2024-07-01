import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWsComponent } from './page-ws.component';

describe('PageWsComponent', () => {
  let component: PageWsComponent;
  let fixture: ComponentFixture<PageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
