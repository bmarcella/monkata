import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EtabPageComponent } from './etab-page.component';

describe('EtabPageComponent', () => {
  let component: EtabPageComponent;
  let fixture: ComponentFixture<EtabPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EtabPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtabPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
