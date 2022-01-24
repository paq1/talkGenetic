import { TestBed } from '@angular/core/testing';

import { GenomeServiceService } from './genome-service.service';

describe('GenomeServiceService', () => {
  let service: GenomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
