import { TestBed } from '@angular/core/testing';

import { NiveauRelService } from './niveau-rel.service';

describe('NiveauRelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiveauRelService = TestBed.get(NiveauRelService);
    expect(service).toBeTruthy();
  });
});
