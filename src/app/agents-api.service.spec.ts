import { TestBed } from '@angular/core/testing';

import { AgentsApiService } from './agents-api.service';

describe('AgentsApiService', () => {
  let service: AgentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
