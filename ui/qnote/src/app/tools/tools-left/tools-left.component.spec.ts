import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsLeftComponent } from './tools-left.component';

describe('ToolsLeftComponent', () => {
  let component: ToolsLeftComponent;
  let fixture: ComponentFixture<ToolsLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
