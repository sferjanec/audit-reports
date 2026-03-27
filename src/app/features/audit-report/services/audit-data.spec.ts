import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AuditDataService } from './audit-data';

describe('AuditDataService', () => {
  let service: AuditDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuditDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
