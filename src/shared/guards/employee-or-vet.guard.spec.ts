import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { employeeOrVetGuard } from './employee-or-vet.guard';

describe('employeeOrVetGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => employeeOrVetGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
