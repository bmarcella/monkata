import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsRightComponent } from './tools-right.component';

describe('ToolsRightComponent', () => {
  let component: ToolsRightComponent;
  let fixture: ComponentFixture<ToolsRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
