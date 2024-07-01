import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { notYetLoginGuard } from './not-yet-login.guard';

describe('notYetLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => notYetLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
