import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { anonimousGuard } from './anonimous.guard';

describe('anonimousGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => anonimousGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
