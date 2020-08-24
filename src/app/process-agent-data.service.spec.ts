import { TestBed } from '@angular/core/testing';

import { ProcessAgentDataService } from './process-agent-data.service';

describe('ProcessAgentDataService', () => {
  let service: ProcessAgentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessAgentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
