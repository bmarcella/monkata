import { TestBed } from '@angular/core/testing';

import { DocumentNivRelService } from './document-niv-rel.service';

describe('DocumentNivRelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentNivRelService = TestBed.get(DocumentNivRelService);
    expect(service).toBeTruthy();
  });
});
