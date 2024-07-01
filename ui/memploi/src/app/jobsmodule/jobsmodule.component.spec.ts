import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsmoduleComponent } from './jobsmodule.component';

describe('JobsmoduleComponent', () => {
  let component: JobsmoduleComponent;
  let fixture: ComponentFixture<JobsmoduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobsmoduleComponent]
    });
    fixture = TestBed.createComponent(JobsmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
