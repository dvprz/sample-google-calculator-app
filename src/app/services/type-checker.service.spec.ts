import { TestBed, inject } from '@angular/core/testing';

import { TypeCheckerService } from './type-checker.service';

describe('TypeCheckerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeCheckerService]
    });
  });

  it('should be created', inject([TypeCheckerService], (service: TypeCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
