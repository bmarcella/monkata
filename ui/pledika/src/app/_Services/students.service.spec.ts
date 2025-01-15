import { TestBed } from '@angular/core/testing';

import { StudentsService } from "./StudentsService";

describe('StudentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentsService = TestBed.get(StudentsService);
    expect(service).toBeTruthy();
  });
});
