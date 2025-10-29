import { TestBed } from '@angular/core/testing';

import { UsersValidationService } from './users-validation.service';

describe('UsersValidationService', () => {
  let service: UsersValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
