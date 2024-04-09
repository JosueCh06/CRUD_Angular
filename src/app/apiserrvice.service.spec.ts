import { TestBed } from '@angular/core/testing';

import { ApiserrviceService } from './apiserrvice.service';

describe('ApiserrviceService', () => {
  let service: ApiserrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiserrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
